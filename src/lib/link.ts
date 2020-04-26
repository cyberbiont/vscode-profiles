import { errorHandlers, errorsLibrary } from './errors';
import VpPaths from './paths';
import VpFileSystem from './fileSystem';
import { FileType, window, Uri } from 'vscode';
import { Dirent } from 'fs';

export type OLink = {
	// paths: {
	// 	profiles: Uri;
	// 	extensionsStandard: Uri;
	// 	extensionsStorage: Uri;
	// };
};

// 🕮 <cyberbiont> da2aa1bd-b0d0-41ac-b924-72016cb985fd.md
export default class Link {
	constructor(
		public cfg: OLink,
		public fs: VpFileSystem,
		public p: VpPaths,
		public on: ReturnType<typeof errorHandlers>,
		public errors: ReturnType<typeof errorsLibrary>,
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
		if (subfolder.isSymbolicLink())
			return this.copyExtensionSymlink(
				srcProfileFolderName,
				destProfileFolderName,
				subfolder.name,
			);
		else if (!this.isExtensionDirectory(subfolder))
			// copy .obsolete and .wtid files
			return this.fs.copy(
				this.p.profiles.derive(srcProfileFolderName, subfolder.name),
				this.p.profiles.derive(destProfileFolderName, subfolder.name),
			);
		else return Promise.resolve();
	}

	async symlinkifyExtension(subfolder: Dirent, profileFolder: string) {
		if (this.isExtensionDirectory(subfolder)) {
			await this.transportExtension(profileFolder, subfolder.name);
			return this.fs.symlinkCreate(
				this.p.extensionsStorage.derive(subfolder.name).pathname,
				this.p.extensionsStorage.derive(profileFolder, subfolder.name),
			);
		} else return Promise.resolve();
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

	private isExtensionDirectory(subfolder: Dirent) {
		// учесть также что теоретически могут быть директории, не являющиеся расщирениями
		return subfolder.isDirectory();
	}
}
