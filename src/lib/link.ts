import { Dirent } from "fs";
import VpPaths from "./paths";
import VpFileSystem from "./fileSystem";
import VpExtensions from "./extensions";
import Errors, { ErrorHandlers } from "./errors";

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
		if (this.isExtensionSymlink(subfolder))
			return this.copyExtensionSymlink(
				srcProfileFolderName,
				destProfileFolderName,
				subfolder.name,
			);
		if (!this.isExtensionDirectory(subfolder))
			// copy .obsolete and .wtid files
			return this.fs.copy(
				this.p.profiles.derive(srcProfileFolderName, subfolder.name),
				this.p.profiles.derive(destProfileFolderName, subfolder.name),
			);
		return Promise.resolve();
	}

	async doMaintenance(subfolderInfo: Dirent, profileFolderName: string) {
		await this.validateExtension(profileFolderName);
		if (this.isExtensionSymlink(subfolderInfo))
			this.validateSymlink(subfolderInfo);
		if (this.isExtensionDirectory(subfolderInfo))
			this.symlinkifyExtension(subfolderInfo, profileFolderName);
		return Promise.resolve();
	}

	async symlinkifyExtension(subfolderInfo: Dirent, profileFolderName: string) {
		await this.transportExtension(profileFolderName, subfolderInfo.name);
		return this.fs.symlinkCreate(
			this.p.extensionsStorage.derive(subfolderInfo.name).pathname,
			this.p.extensionsStorage.derive(profileFolderName, subfolderInfo.name),
		);
	}

	async validateExtension(profileFolderName) {
		const ext = this.extensions.get(profileFolderName);
	}

	private async validateSymlink(subfolder: Dirent) {
		const link = await this.fs
			.symlinkRead(this.p.profiles.derive(subfolder.name))
			.catch((e) => {
				if (e.code === `ENOENT`) {
					throw new this.errors.MissingSymlink(
						`no symlink found in themes folder`,
					);
				}
				console.error(e);
				throw e;
			});
		// if !(link)
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

	private isExtensionDirectory(subfolder: Dirent) {
		// учесть также, что теоретически могут быть директории, не являющиеся расширениями
		const excludedExtensionsRules = [`ms-vsliveshare.vsliveshare-`];
		return (
			subfolder.isDirectory() &&
			!excludedExtensionsRules.some((rule) => subfolder.name.includes(rule))
		);
		// С Live share существует проблема - процесс vsls-agent.exe, который запускается автоматически при активации приложения,
		// не дает нам переместить папку (получаем ошибку доступа). Поэтому прижется исключить из симлинкфикации
	}
}
