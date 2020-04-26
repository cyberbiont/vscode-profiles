import User from './user';
import VpPaths from './paths';
import ProfilesRepository from './profilesRepository';
import { commands } from 'vscode';
import { errorsLibrary, errorHandlers } from './errors';
import Link from './link';

export type OActions = {};

export default class Actions {
	constructor(
		public cfg: OActions,
		public user: User,
		private link: Link,
		public p: VpPaths,
		public pool: ProfilesRepository,
		public on: ReturnType<typeof errorHandlers>,
		public errors: ReturnType<typeof errorsLibrary>,
	) {}

	// COMMAND ACTIONS
	async createProfileCommand() {
		const newProfileName = await this.createNewProfileDirectory();
		return this.switchProfile(newProfileName);
	}

	async cloneProfileCommand() {
		const srcProfileName = await this.user.selectProfileName();
		const destProfileName = await this.createNewProfileDirectory();

		await this.symlinkifyExtensions(srcProfileName).then(
			undefined,
			this.on.error,
		);

		await this.copyProfileContents(srcProfileName, destProfileName).then(
			undefined,
			this.on.error,
		);
		//! 🕮 <cyberbiont> 3189b2cc-81ad-4e34-a8aa-565f8ce5ef28.md

		return this.switchProfile(destProfileName);
	}

	async switchProfileCommand() {
		const chosenProfileName = await this.user.selectProfileName();
		await this.link.checkMatchWithCurrentProfile(chosenProfileName);
		await this.switchProfile(chosenProfileName);
		return commands.executeCommand('workbench.action.reloadWindow');
	}

	async renameProfileCommand() {
		const oldName = await this.user.selectProfileName();
		const newName = await this.user.promptProfileName(oldName);

		// 🕮 <cyberbiont> a56eac98-df44-4194-94ab-a0e952ad8fc4.md
		await this.link
			.renameProfileFolder(oldName, newName)
			.then(undefined, this.on.error);

		// await this.link.switchLinkToProfile(newName).then(undefined, this.on.error);

		return this.pool.rescanProfiles();
	}

	async deleteProfileCommand() {
		const name = await this.user.selectProfileName();
		this.link.checkMatchWithCurrentProfile(name);

		await this.link.deleteProfileFolder(name);
		return this.pool.rescanProfiles();
		// 🕮 <cyberbiont> 33336010-437b-4ac1-b264-9cd671cba40a.md
	}

	cleanExtensionsHeapCommand() {
		// 🕮 <cyberbiont> 89f90333-ac82-490b-91bc-0b677bc643c3.md
	}

	public async rescan() {
		return this.pool.rescanProfiles();
	}

	// ACTIONS
	// 🕮 <cyberbiont> 4936ede9-783b-465a-b760-56d1a0d858d3.md

	async switchProfile(profileNameToActivate: string) {
		const currentProfileName = await this.link.getCurrentProfileName();
		await this.symlinkifyExtensions(currentProfileName);
		// 🕮 <cyberbiont> 7e1a1010-7d14-43a2-89af-cf7c41ebdcc2.md

		await this.link
			.switchLinkToProfile(profileNameToActivate)
			.then(undefined, this.on.error);

		return commands.executeCommand(`settings.cycle.${profileNameToActivate}`);
	}

	private async createNewProfileDirectory() {
		const name = await this.user.promptProfileName();
		await this.link.checkMatchWithCurrentProfile(name);
		await this.link.createProfileDirectory(name).then(undefined, this.on.error);
		await this.pool.rescanProfiles();
		return name;
	}
	// симлинк на vscode-profile должен создаваться автоматически в новых профилях!
	// вести список "глобальных" расширений, которые будут удаляться / устанавливаться во всех профилях?
	// следить за изенениями в файле obsolete (парсить его, т.к. там  JSON) и синхронизировать изменения для этих расширений

	async copyProfileContents(
		srcProfileFolderName: string,
		destProfileFolderName: string,
	) {
		const subfoldersInfo = await this.link.getSubfoldersInfo(
			srcProfileFolderName,
		);
		return Promise.all(
			subfoldersInfo.map((subfolderInfo) =>
				this.link.copyProfileContent(
					subfolderInfo,
					srcProfileFolderName,
					destProfileFolderName,
				),
			),
		);
	}

	async symlinkifyExtensions(profileFolderName: string) {
		// 🕮 <cyberbiont> f7ea2dc2-10d1-4915-8cb2-4b6aa3c3fff0.md
		// 🕮 <cyberbiont> b2fcd0c9-db59-4981-ae8a-bbba8edbbedd.md
		const subfoldersInfo = await this.link.getSubfoldersInfo(profileFolderName);

		await Promise.all(
			subfoldersInfo.map((subfolderInfo) =>
				this.link.symlinkifyExtension(subfolderInfo, profileFolderName),
			),
		);
		return subfoldersInfo;
	}
}
// 🕮 <cyberbiont> ded39fb3-1135-4fba-a581-07b06b82306e.md

// TODO добавить всплывающие уведомления о том, что вообще происходит
// TODO отображение иени профайла в статус-баре и может даже менюшки для выбора профайла
