import User from './user';
import VpPaths from './paths';
import ProfilesRepository from './profilesRepository';
import { commands, window } from 'vscode';
import { errorsLibrary, errorHandlers } from './errors';
import Link from './link';

export type OActions = {};

export default class Actions {
	constructor(
		public cfg: OActions,
		public user: User,
		private link: Link,
		public p: VpPaths,
		public profiles: ProfilesRepository,
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

		await this.symlinkifyExtensions(srcProfileName).catch(this.on.error);
		await this.copyProfileContents(srcProfileName, destProfileName).catch(
			this.on.error,
		);
		//! 🕮 <cyberbiont> 3189b2cc-81ad-4e34-a8aa-565f8ce5ef28.md

		return this.switchProfile(destProfileName);
	}

	async switchProfileCommand() {
		// 🕮 <cyberbiont> b90fbfb4-6c4f-4750-ac8c-5c53699a2d08.md
		const chosenProfileName = await this.user.selectProfileName();
		// await this.user.checkMatchWithCurrentProfile(chosenProfileName); // предотвратить повторное определение current profile name
		// TODO тогда не выводить вообще current в списке
		await this.switchProfile(chosenProfileName);
		// return commands.executeCommand('workbench.action.reloadWindow');
	}

	async renameProfileCommand() {
		const oldName = await this.user.selectProfileName();
		const newName = await this.user.promptProfileName(oldName);
		// 🕮 <cyberbiont> a56eac98-df44-4194-94ab-a0e952ad8fc4.md
		await this.link.renameProfileFolder(oldName, newName).catch(this.on.error);
		// await this.link.switchLinkToProfile(newName).then(undefined, this.on.error);
		return this.profiles.rescanProfiles();
	}

	async deleteProfileCommand() {
		const name = await this.user.selectProfileName();

		await this.link.deleteProfileFolder(name);
		return this.profiles.deleteProfileEntry(name);
		// 🕮 <cyberbiont> 33336010-437b-4ac1-b264-9cd671cba40a.md
	}

	cleanExtensionsHeapCommand() {
		// 🕮 <cyberbiont> 89f90333-ac82-490b-91bc-0b677bc643c3.md
	}

	public async rescanCommand() {
		return this.profiles.rescanProfiles();
	}

	// ACTIONS
	// 🕮 <cyberbiont> 4936ede9-783b-465a-b760-56d1a0d858d3.md

	async switchProfile(profileNameToActivate: string) {
		// throw new this.errors.ExtensionsSymlinkError(); // TODO впилить куда-то где реально такая оибка возникает
		// await this.symlinkifyExtensions(this.profiles.active.name); // сделать currentprofile name по дефолту
		// 🕮 <cyberbiont> 7e1a1010-7d14-43a2-89af-cf7c41ebdcc2.md

		await this.link
			.switchLinkToProfile(profileNameToActivate)
			.catch(this.on.error);

		this.profiles.activateProfile(profileNameToActivate);

		return commands
			.executeCommand(`settings.cycle.${profileNameToActivate}`)
			.then(undefined, (e) => {
				// обработать ошибку, когда нет такой команды
				window.showWarningMessage(`There is no configuration registered in setting.json for this profile.
				You won't be able to sync your profile with settings sync!`);
			});
	}

	private async createNewProfileDirectory() {
		const name = await this.user.promptProfileName();
		await this.user.checkMatchWithCurrentProfile(name);
		await this.link.createProfileDirectory(name).then(undefined, this.on.error);
		await this.profiles.rescanProfiles();
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
