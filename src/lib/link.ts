import { errorHandlers, errorsLibrary } from './errors';
import VpPaths from './paths';
import VpFileSystem from './fileSystem';
import { FileType, window, Uri } from 'vscode';

export type OLink = {
	paths: {
		profiles: Uri;
		extensionsStandard: Uri;
		extensionsStorage: Uri;
	};
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
			this.p.extendUriPath(this.cfg.paths.profiles, oldName),
			this.p.extendUriPath(this.cfg.paths.profiles, newName),
		);
	}

	deleteProfileFolder(name: string) {
		return this.fs.delete(this.p.extendUriPath(this.cfg.paths.profiles, name));
	}

	createProfileDirectory(name: string) {
		const a = this.p.getUri('C:/Users/larin/.vscode/profiles/ert');
		const b = this.p.extendUriPath(this.cfg.paths.profiles, name);
		return this.fs.createDirectory(
			this.p.extendUriPath(this.cfg.paths.profiles, name),
		);
	}

	// SYMLINKS
	async getCurrentProfileName() {
		return this.p.getBasename(
			await this.fs.symlinkRead(this.cfg.paths.extensionsStandard.fsPath),
		);
	}

	switchLinkToProfile(profileName: string) {
		return this.fs.symlinkSwitch(
			this.p.extendUriPath(this.cfg.paths.profiles, profileName).fsPath,
			this.cfg.paths.extensionsStandard.fsPath,
		);
	}

	async checkMatchWithCurrentProfile(profileName: string) {
		const currentProfileName = await this.getCurrentProfileName();
		if (profileName === currentProfileName) {
			window.showInformationMessage('This is your current profile');
			throw new this.errors.InteractionError(
				'selected profile name matches current profile',
			);
		}
	}

	getSubfoldersInfo(profileFolderName: string) {
		return this.fs.readDirectory(
			this.p.extendUriPath(this.cfg.paths.profiles, profileFolderName),
		);
	}

	copyProfileContent(
		subfolderInfo: [string, FileType],
		srcProfileFolderName: string,
		destProfileFolderName: string,
	) {
		const [name, type] = subfolderInfo;
		if (this.isSymbolicLink(type))
			return this.copyExtensionSymlink(
				srcProfileFolderName,
				destProfileFolderName,
				name,
			);
		else if (!this.isExtensionDirectory(type))
			// copy .obsolete and .wtid files
			return this.fs
				.copy(
					this.p.extendUriPath(
						this.cfg.paths.profiles,
						srcProfileFolderName,
						name,
					),
					this.p.extendUriPath(
						this.cfg.paths.profiles,
						destProfileFolderName,
						name,
					),
				)
				.then(undefined, this.on.error);
		else return Promise.resolve();
	}

	async symlinkifyExtension(
		subfolderInfo: [string, FileType],
		profileFolder: string,
	) {
		const [extensionFolderName, type] = subfolderInfo;
		if (this.isExtensionDirectory(type)) {
			await this.transportExtension(profileFolder, extensionFolderName);
			return this.fs.symlinkCreate(
				this.p.extendUriPath(
					this.cfg.paths.extensionsStorage,
					extensionFolderName,
				).fsPath,
				this.p.extendUriPath(
					this.cfg.paths.extensionsStorage,
					profileFolder,
					extensionFolderName,
				).fsPath,
			);
		} else return Promise.resolve();
	}

	private transportExtension(
		profileFolder: string,
		extensionFolderName: string,
	) {
		return this.fs.rename(
			this.p.extendUriPath(
				this.cfg.paths.profiles,
				profileFolder,
				extensionFolderName,
			),
			this.p.extendUriPath(
				this.cfg.paths.extensionsStorage,
				extensionFolderName,
			),
		);
	}

	private isSymbolicLink(type: FileType): type is FileType.SymbolicLink {
		return [64, 65, 66].includes(type);
	}

	private isExtensionDirectory(type: FileType): type is FileType.SymbolicLink {
		// учесть также что теоретически могут быть директории, не являющиеся расщирениями
		return type === 2;
	}

	private copyExtensionSymlink(
		baseProfileName: string,
		newProfileName: string,
		name: string,
	): Promise<void> {
		return this.fs.symlinkCopy(
			this.p.extendUriPath(this.cfg.paths.profiles, baseProfileName, name)
				.fsPath,
			this.p.extendUriPath(this.cfg.paths.profiles, newProfileName, name)
				.fsPath,
		);
	}
}
