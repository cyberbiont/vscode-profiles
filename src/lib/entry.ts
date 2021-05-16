import Errors, { ErrorHandlers } from './errors';
import VpPaths, { Path } from './paths';

import { Dirent } from 'fs';
import VpExtensions from './extensions';
import VpFileSystem from './fileSystem';
import pkg from '../../package.json';

export enum EntryMaintenanceStatus {
	WAS_OK = `no problems found`, // `no problems found`
	WAS_REPAIRED = `broken link, reinstalled extension`,
	WAS_SYMLINKIFIED = `symlinkified extension folder`, // `symlinkified extension folder`,
	WAS_EXCLUDED = `extension was excluded from processing in settings`,
}

export enum EntryType {
	EXT_SYMLINK = `extension symlink`,
	EXT_DIR = `extension directory`,
	ELSE = `something else`,
}

// 🕮 <cyberbiont> fd50f83a-a49e-4266-a8a8-77375de168c9.md
const entryTypes = {
	[EntryType.EXT_SYMLINK]: {
		test: function isExtensionSymlink(subfolder: Dirent) {
			return subfolder.isSymbolicLink();
		},
	},
	[EntryType.EXT_DIR]: {
		test: function isExtensionDirectory(subfolder: Dirent) {
			return subfolder.isDirectory();
			// 🕮 <cyberbiont> 03d66ea1-2c40-46c1-9035-035c5be77b90.md
		},
	},
	[EntryType.ELSE]: {
		test: () => true,
	},
};

export interface MaintenanceResults {
	name: string;
	status: EntryMaintenanceStatus[];
}

export type OEntry = AnyObject;

// 🕮 <cyberbiont> da2aa1bd-b0d0-41ac-b924-72016cb985fd.md
export default class Entry {
	constructor(
		public cfg: OEntry,
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

	async createProfileDirectory(name: string) {
		const location = this.p.profiles.derive(name);
		await this.fs.createDirectory(location);
		return location;
	}

	// SYMLINKS

	async switchLinkToProfile(profileName: string) {
		return this.fs.symlinkSwitch(
			this.p.profiles.derive(profileName).fsPath,
			this.p.extensionsStandard,
		);
	}

	async getSubfoldersInfo(
		profileFolderName: string,
		{ filter }: { filter?: EntryType } = {},
	) {
		const dirents = await this.fs.readDirectory(
			this.p.profiles.derive(profileFolderName),
		);
		const result = filter ? dirents.filter(entryTypes[filter].test) : dirents;
		// 🕮 <cyberbiont> 29489f9f-cc46-4e00-9425-33e48f067c72.md
		return result;
	}

	async copyProfileContent(
		subfolder: Dirent,
		srcProfileFolderName: string,
		destProfileFolderName: string,
	) {
		if (this.isExcluded(subfolder)) return Promise.resolve();
		if (entryTypes[EntryType.EXT_SYMLINK].test(subfolder))
			return this.copyExtensionSymlink(
				srcProfileFolderName,
				destProfileFolderName,
				subfolder.name,
			);

		// 🕮 <cyberbiont> a14faebd-73e9-443d-888a-0c6f6afd329b.md

		if (!entryTypes[EntryType.EXT_DIR].test(subfolder))
			return this.fs.copy(
				this.p.profiles.derive(srcProfileFolderName, subfolder.name),
				this.p.profiles.derive(destProfileFolderName, subfolder.name),
			);
		return Promise.resolve();
	}

	private async repairBrokenEntry(
		path: Path,
		entryType: EntryType,
		id = this.extensions.getExtensionId(path.pathname),
	) {
		console.debug(`repairing broken extension directory...`);
		// delete broken entry
		if (entryType === EntryType.EXT_SYMLINK) await this.fs.symlinkDelete(path);
		else await this.fs.delete(path);
		// re-install extension
		console.debug(`re-installing extension ${id}...`);
		return this.extensions.installExtension(id);
	}

	private determineEntryType(subfolderInfo: Dirent) {
		if (entryTypes[EntryType.EXT_SYMLINK].test(subfolderInfo))
			return EntryType.EXT_SYMLINK;
		if (entryTypes[EntryType.EXT_DIR].test(subfolderInfo))
			return EntryType.EXT_DIR;
		// if (this.isExtensionDirectory(subfolderInfo)) return EntryType.EXT_DIR;
		return EntryType.ELSE;
	}

	async doProfileFolderMaintenance(
		subfolderInfo: Dirent,
		profileFolderName: string,
		profileIsActive: boolean,
	) {
		const path = this.p.profiles.derive(profileFolderName, subfolderInfo.name);
		let entryType: EntryType = this.determineEntryType(subfolderInfo);
		const status: EntryMaintenanceStatus[] = [];
		const isExcluded = this.isExcluded(subfolderInfo);

		if (isExcluded) status.push(EntryMaintenanceStatus.WAS_EXCLUDED);

		if (entryType === EntryType.EXT_SYMLINK) {
			const isOk = await this.validateSymlink(path);

			if (profileIsActive && !isOk && !isExcluded) {
				await this.repairBrokenEntry(path, entryType);
				entryType = EntryType.EXT_DIR;
				// 🕮 <cyberbiont> 6e490cf1-af72-4a39-9e49-7b44960f87fe.md
				status.push(EntryMaintenanceStatus.WAS_REPAIRED);
			}
		}

		// 🕮 <cyberbiont> 16214a5a-f996-4d8b-a969-d3cb3f204a2b.md

		if (entryType === EntryType.EXT_DIR && !isExcluded) {
			await this.symlinkifyExtension(subfolderInfo, profileFolderName);
			status.push(EntryMaintenanceStatus.WAS_SYMLINKIFIED);
			//  = `symlinkified extension folder`;
		}

		if (!isExcluded && !status.length)
			status.push(EntryMaintenanceStatus.WAS_OK);

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

	private async validateSymlink(path: Path) {
		try {
			const target = await this.fs.symlinkRead(path);

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

	async symlinkThisExtensionToProfile(profileName: string) {
		// используется только в developmentMode чтобы линковать локальную версию vscode-profiles во все профили
		const name = `${pkg.publisher}.${pkg.name}-${pkg.version}`;
		return this.fs.symlinkCreate(
			this.p.extensionsStorage.derive(name).fsPath,
			this.p.profiles.derive(profileName, name),
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

	private isExcluded(subfolder: Dirent) {
		// 🕮 <cyberbiont> dd5c74f1-1e5e-4db1-af97-4f537c1a9a26.md
		const excludedExtensionsRules = [
			`ms-vsliveshare.vsliveshare-`,
			`ms-vscode-remote.remote-wsl-`,
			`ms-vscode-remote.remote-ssh-`,
			`ms-vscode-remote.remote-containers`,
		];
		return excludedExtensionsRules.some(rule => subfolder.name.includes(rule));
	}

	async getStoredExtensions() {
		return this.fs.readDirectory(this.p.extensionsStorage);
	}

	async deleteStoredExtension(dirent: Dirent) {
		return this.fs.delete(this.p.extensionsStorage.derive(dirent.name));
	}
}
