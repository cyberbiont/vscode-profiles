import Errors, { ErrorHandlers } from './errors';
import VpPaths, { Path } from './paths';

import { Dirent } from 'fs';
import VpExtensions from './extensions';
import VpFileSystem from './fileSystem';
import { commands } from 'vscode';

export enum LinkMaintenanceStatus {
	WAS_OK = `no problems found`, // `no problems found`
	WAS_REPAIRED = `broken link, reinstalled extension`,
	WAS_SYMLINKIFIED = `symlinkified extension folder`, // `symlinkified extension folder`,
	WAS_EXCLUDED = `extension was excluded from processing in settings`,
}

enum EntryType {
	EXT_SYMLINK = `extension symlink`,
	EXT_DIR = `extension directory`,
	ELSE = `something else`,
}

export interface MaintenanceResults {
	name: string;
	status: LinkMaintenanceStatus[];
}

export type OLink = {};
//! это на самом леое не Link, а folder внутри папки профиля моет быть и ссылкой, и папкой (назвать его Entry?)
// 🕮 <cyberbiont> da2aa1bd-b0d0-41ac-b924-72016cb985fd.md
export default class Link {
	constructor(
		public cfg: OLink,
		public fs: VpFileSystem,
		public p: VpPaths,
		public on: ErrorHandlers,
		public errors: Errors,
		private extensions: VpExtensions,
	) {}

	// PROFILE FOLDERS
	renameProfileFolder(oldName: string, newName: string) {
		return this.fs.rename(
			this.p.profiles.derive(oldName),
			this.p.profiles.derive(newName),
		);
	}

	deleteProfileFolder(name: string) {
		return this.fs.delete(this.p.profiles.derive(name));
	}

	createProfileDirectory(name: string) {
		return this.fs.createDirectory(this.p.profiles.derive(name));
	}

	// SYMLINKS

	async switchLinkToProfile(profileName: string) {
		return this.fs.symlinkSwitch(
			this.p.profiles.derive(profileName).fsPath,
			this.p.extensionsStandard,
		);
	}

	async getSubfoldersInfo(profileFolderName: string) {
		return this.fs.readDirectory(this.p.profiles.derive(profileFolderName));
	}

	async copyProfileContent(
		subfolder: Dirent,
		srcProfileFolderName: string,
		destProfileFolderName: string,
	) {
		if (this.isExcluded(subfolder)) return Promise.resolve();
		if (this.isExtensionSymlink(subfolder))
			return this.copyExtensionSymlink(
				srcProfileFolderName,
				destProfileFolderName,
				subfolder.name,
			);

		// if (!this.isExtensionDirectory(subfolder))
		// 	// copy .obsolete and .wtid files
		// 	return this.fs.copy(
		// 		this.p.profiles.derive(srcProfileFolderName, subfolder.name),
		// 		this.p.profiles.derive(destProfileFolderName, subfolder.name),
		// 	);
		if (!this.isExtensionDirectory(subfolder))
			return this.fs.copy(
				this.p.profiles.derive(srcProfileFolderName, subfolder.name),
				this.p.profiles.derive(destProfileFolderName, subfolder.name),
			);
		return Promise.resolve();
	}

	/* если использовать maintenance только на текущем профиле, это позволит нам использоать класс VScode Extensions
	потому что мы анализируем не текущую папку, то не получится так сделать
	*/
	getExtensionId(extensionFolderName: string) {
		return extensionFolderName.slice(0, extensionFolderName.lastIndexOf(`-`));
	}

	private async repairBrokenEntry(
		path: Path,
		entryType: EntryType,
		id = this.getExtensionId(path.pathname),
	) {
		console.debug(`repairing broken extension directory...`);
		// delete broken entry
		if (entryType === EntryType.EXT_SYMLINK) await this.fs.symlinkDelete(path);
		else await this.fs.delete(path);
		// re-install extension
		console.debug(`re-installing extension ${id}...`);
		return commands.executeCommand(`workbench.extensions.installExtension`, id);
		// return;
	}

	private determineEntryType(subfolderInfo: Dirent) {
		if (this.isExtensionSymlink(subfolderInfo)) return EntryType.EXT_SYMLINK;
		if (this.isExtensionDirectory(subfolderInfo)) return EntryType.EXT_DIR;
		return EntryType.ELSE;
	}

	async doMaintenance(
		subfolderInfo: Dirent,
		profileFolderName: string,
		profileIsActive: boolean,
	) {
		const path = this.p.profiles.derive(profileFolderName, subfolderInfo.name);
		let entryType: EntryType = this.determineEntryType(subfolderInfo);
		const status: LinkMaintenanceStatus[] = [];
		const isExcluded = this.isExcluded(subfolderInfo);
		if (isExcluded) status.push(LinkMaintenanceStatus.WAS_EXCLUDED);
		if (entryType === EntryType.EXT_SYMLINK) {
			const isOk = await this.validateSymlink(path);
			if (profileIsActive && !isOk && !isExcluded) {
				await this.repairBrokenEntry(path, entryType);
				entryType = EntryType.EXT_DIR;
				// todo: внести это внутрь this.repairBrokenEntry.
				// entryType возможно надо  сдалать глбальной переменной через св-во класса link вообще
				status.push(LinkMaintenanceStatus.WAS_REPAIRED);
			}
		}

		/* если даже симлинк ОК или не симлинк, (т.е. папка присутствует на складе расширений),
		она может быть поврежденной - надо проверить, что расширение грузится оттуда)
		проблема в том, что если мы на предыдущем шаге все исправили / переустановили расширение,
		оно все равно будет не ОК,пока мы не перезагрузим VScode.
		Поэтому за один проход нет смысла сразу же проверять (исключаем с помощью WAS_REPAIRED) */
		/* if (
			profileIsActive &&
			(entryType === EntryType.EXT_SYMLINK ||
				entryType === EntryType.EXT_DIR) &&
			!status.includes(LinkMaintenanceStatus.WAS_REPAIRED)
		) {
			const id = this.getExtensionId(subfolderInfo.name);
			const isOk = this.extensions.get(id);

			if (!isOk) {
				await this.repairBrokenEntry(path, entryType, id);
				entryType = EntryType.EXT_DIR;
				status.push(LinkMaintenanceStatus.WAS_REPAIRED);
			}
		} */

		if (entryType === EntryType.EXT_DIR && !isExcluded) {
			await this.symlinkifyExtension(subfolderInfo, profileFolderName);
			status.push(LinkMaintenanceStatus.WAS_SYMLINKIFIED);
			//  = `symlinkified extension folder`;
		}

		if (!isExcluded && !status.length)
			status.push(LinkMaintenanceStatus.WAS_OK);

		return {
			name: subfolderInfo.name,
			status,
		};
	}

	async symlinkifyExtension(subfolderInfo: Dirent, profileFolderName: string) {
		await this.transportExtension(profileFolderName, subfolderInfo.name);
		return this.fs.symlinkCreate(
			this.p.extensionsStorage.derive(subfolderInfo.name).fsPath,
			this.p.profiles.derive(profileFolderName, subfolderInfo.name),
		);
	}

	// private async validateExtension(
	// 	subfolderInfo: Dirent,
	// 	profileFolderName: string,
	// ) {
	// 	return this.extensions.get(subfolderInfo.name);

	// 	console.log(profileFolderName);
	// }

	private async validateSymlink(path: Path) {
		try {
			const target = await this.fs.symlinkRead(path);
			// console.log(target);
			return this.fs.exists(target);
		} catch (e) {
			if (e.code === `ENOENT`) {
				throw new this.errors.MissingSymlink(
					`no symlink found in profiles folder`,
				);
			}
			throw e;
		}
	}

	private async transportExtension(
		profileFolder: string,
		extensionFolderName: string,
	) {
		return this.fs.rename(
			this.p.profiles.derive(profileFolder, extensionFolderName),
			this.p.extensionsStorage.derive(extensionFolderName),
		);
	}

	private async copyExtensionSymlink(
		baseProfileName: string,
		newProfileName: string,
		name: string,
	) {
		return this.fs.symlinkCopy(
			this.p.profiles.derive(baseProfileName, name),
			this.p.profiles.derive(newProfileName, name),
		);
	}

	// 🕮 <cyberbiont> 68360ca5-87b0-4d79-99aa-ade28c328601.md
	private isExtensionSymlink(subfolder: Dirent) {
		return subfolder.isSymbolicLink();
	}

	private isExcluded(subfolder: Dirent) {
		// С Live share существует проблема - процесс vsls-agent.exe, который запускается автоматически при активации приложения,
		// не дает нам переместить папку (получаем ошибку доступа). Поэтому прижется исключить из симлинкфикации
		const excludedExtensionsRules = [`ms-vsliveshare.vsliveshare-`];
		return excludedExtensionsRules.some((rule) =>
			subfolder.name.includes(rule),
		);
	}

	private isExtensionDirectory(subfolder: Dirent) {
		// учесть также, что теоретически могут быть директории, не являющиеся расширениями
		return subfolder.isDirectory();
	}
}
