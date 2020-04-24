import UserInteractions from './userInteractions';
import VpFileSystem from './fileSystem';
import VpPaths from './paths';
import ProfilesRepository from './profilesRepository';
import { FileType, window, commands } from 'vscode';
import Errors, { errorHandlers } from './errors';

export type OActions = {
	paths: {
		profiles: string;
		extensionsStandard: string;
		extensionsStorage: string;
	};
};

export default class Actions {
	constructor(
		public cfg: OActions,
		public userInteractions: UserInteractions,
		public fs: VpFileSystem,
		public paths: VpPaths,
		public pool: ProfilesRepository,
		public on: ReturnType<typeof errorHandlers>,
		public errors: ReturnType<typeof Errors>,
	) {}

	async createProfile() {
		const name = await this.createNewProfileDirectory();
		return this.switchProfile(name);
	}

	async cloneProfile() {
		const baseProfileName = await this.userInteractions.selectProfileName();
		const newProfileName = await this.createNewProfileDirectory();

		await this.symlinkifyExtensions(
			this.paths.join(this.cfg.paths.profiles, baseProfileName),
		);

		// пересканируем, т.к после simlinkify папки должны были стать симлинками, и мы должны это учесть, чтобы скопировать их
		const folderContentsTuples: [
			string,
			FileType,
		][] = await this.fs
			.readDirectory(
				this.paths.joinToUri(this.cfg.paths.profiles, baseProfileName),
			)
			.then(undefined, this.on.error);
		//! 🕮 <cyberbiont> 3189b2cc-81ad-4e34-a8aa-565f8ce5ef28.md

		return Promise.all(
			folderContentsTuples.map((tuple) =>
				this.copyContent(tuple, baseProfileName, newProfileName),
			),
		);
	}

	async copyContent(
		tuple: [string, FileType],
		srcProfileName: string,
		destProfileName: string,
	): Promise<void> {
		const [name, type] = tuple;
		if (this.isSymbolicLink(type))
			return this.copyExtensionSymlink(srcProfileName, destProfileName, name);
		else if (!this.isDirectory(type))
			// copy .obsolete and .wtid files
			return this.fs
				.copy(
					this.paths.joinToUri(this.cfg.paths.profiles, srcProfileName, name),
					this.paths.joinToUri(this.cfg.paths.profiles, destProfileName, name),
				)
				.then(undefined, this.on.error);
		else return Promise.resolve();
	}

	async switchProfile(name?: string) {
		await this.symlinkifyExtensions();
		// 🕮 <cyberbiont> 7e1a1010-7d14-43a2-89af-cf7c41ebdcc2.md

		name = name ? name : await this.userInteractions.selectProfileName();
		await this.checkMatchWithCurrentProfile(name);

		await this.fs
			.switchSymlink(
				this.paths.join(this.cfg.paths.profiles, name),
				this.cfg.paths.extensionsStandard,
			)
			.then(undefined, this.on.error);
		commands.executeCommand('settings.cycle' + name);
		return commands.executeCommand('workbench.action.reloadWindow');
	}

	async renameProfile() {
		const name = await this.userInteractions.selectProfileName();
		const newName = await this.userInteractions.promptProfileName(name);

		// 🕮 <cyberbiont> a56eac98-df44-4194-94ab-a0e952ad8fc4.md
		await this.fs
			.rename(
				this.paths.joinToUri(this.cfg.paths.profiles, name),
				this.paths.joinToUri(this.cfg.paths.profiles, newName),
			)
			.then(undefined, this.on.error);

		await this.fs
			.switchSymlink(
				this.paths.join(this.cfg.paths.profiles, newName),
				this.cfg.paths.extensionsStandard,
			)
			.then(undefined, this.on.error);

		return this.rescan();
	}

	async checkMatchWithCurrentProfile(name: string): Promise<void> {
		const currentProfileName = await this.getCurrentProfileName();
		if (name === currentProfileName) {
			window.showInformationMessage('This is your current profile');
			throw new this.errors.InteractionError(
				'selected profile name matches current profile',
			);
		}
	}

	async deleteProfile() {
		const name = await this.userInteractions.selectProfileName();
		this.checkMatchWithCurrentProfile(name);

		await this.fs.delete(this.paths.joinToUri(this.cfg.paths.profiles, name));
		return this.rescan();
		// 🕮 <cyberbiont> 33336010-437b-4ac1-b264-9cd671cba40a.md
	}

	cleanExtensionsHeap() {
		// 🕮 <cyberbiont> 89f90333-ac82-490b-91bc-0b677bc643c3.md
	}

	private async getCurrentProfileName() {
		return this.paths.getBasename(
			await this.fs.readSymlink(this.cfg.paths.extensionsStandard),
		);
	}

	private async createNewProfileDirectory() {
		const name = await this.userInteractions.promptProfileName();
		await this.fs
			.createDirectory(this.paths.joinToUri(this.cfg.paths.profiles, name))
			.then(undefined, this.on.error);
		await this.rescan();
		return name;
	}

	private async copyExtensionSymlink(
		baseProfileName: string,
		newProfileName: string,
		name: string,
	): Promise<void> {
		return this.fs
			.symlinkCopy(
				this.paths.join(this.cfg.paths.profiles, baseProfileName, name),
				this.paths.join(this.cfg.paths.profiles, newProfileName, name),
			)
			.then(undefined, this.on.error);
	}

	public async rescan() {
		return this.pool.rescanProfiles();
	}

	private async transportExtension(
		profileFolder: string,
		extensionFolderName: string,
	): Promise<void> {
		// move to heap
		const pathInHeap = this.paths.joinToUri(
			this.cfg.paths.extensionsStorage,
			extensionFolderName,
		);
		return this.fs
			.rename(
				this.paths.joinToUri(
					// this.cfg.paths.profiles,
					profileFolder,
					extensionFolderName,
				),
				pathInHeap,
			)
			.then(undefined, this.on.error);
	}

	private isSymbolicLink(type: FileType): type is FileType.SymbolicLink {
		return [64, 65, 66].includes(type);
	}

	private isDirectory(type: FileType): type is FileType.SymbolicLink {
		return type === 2;
	}

	private async symlinkifyExtensions(
		profileFolder: string = this.cfg.paths.extensionsStandard,
	) {
		// 🕮 <cyberbiont> f7ea2dc2-10d1-4915-8cb2-4b6aa3c3fff0.md
		// 🕮 <cyberbiont> b2fcd0c9-db59-4981-ae8a-bbba8edbbedd.md
		const folderContentsTuples: [
			string,
			FileType,
		][] = await this.fs
			.readDirectory(this.paths.getUri(profileFolder))
			.then(undefined, this.on.error);

		await Promise.all(
			folderContentsTuples.map(async (tuple) => {
				const [extensionFolderName, type] = tuple;
				if (this.isDirectory(type)) {
					await this.transportExtension(profileFolder, extensionFolderName);
					return this.fs.symlinkCreate(
						this.paths.join(
							this.cfg.paths.extensionsStorage,
							extensionFolderName,
						),
						this.paths.join(profileFolder, extensionFolderName),
					);
				} else return Promise.resolve();
			}),
		);

		return folderContentsTuples;
	}
}
// 🕮 <cyberbiont> ded39fb3-1135-4fba-a581-07b06b82306e.md

// TODO добавить всплывающие уведомления о том, что вообще происходит
// TODO отображение иени профайла в статус-баре и может даже менюшки для выбора профайла
