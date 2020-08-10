import Errors, { ErrorHandlers } from './errors';
import Link, { EntryType } from './link';
import { commands, window } from 'vscode';

import ProfilesRepository from './profilesRepository';
import User from './user';
import VpPaths from './paths';

export type OActions = {
	workspaceProfile?: string;
	autoSwitchToWorkspaceProfile: boolean;
};

export default class Actions {
	constructor(
		public cfg: OActions,
		public user: User,
		private link: Link,
		public p: VpPaths,
		public profiles: ProfilesRepository,
		public on: ErrorHandlers,
		public errors: Errors,
	) {}

	// COMMAND ACTIONS
	public async createProfileCommand() {
		const newProfileName = await this.createNewProfileDirectory();
		await window.showInformationMessage(`Created profile ${newProfileName}`);
		return this.switchToProfile(newProfileName);
	}

	public async cloneProfileCommand() {
		const srcProfileName = await this.user.selectProfileName({
			filterOutActive: false,
			placeholder: `select the profile you want to clone`,
		});
		const destProfileName = await this.createNewProfileDirectory({
			useExisting: true,
		});

		await this.profiles.doProfileMaintenance(srcProfileName);
		await this.profiles.copyProfileContents(srcProfileName, destProfileName);

		await window.showInformationMessage(
			`Created profile ${destProfileName} from ${srcProfileName}`,
		);
		return this.switchToProfile(destProfileName);
	}

	public async switchProfileCommand() {
		// 🕮 <cyberbiont> b90fbfb4-6c4f-4750-ac8c-5c53699a2d08.md
		// 🕮 <cyberbiont> 3189b2cc-81ad-4e34-a8aa-565f8ce5ef28.md
		const chosenProfileName = await this.user.selectProfileName();
		return this.switchToProfile(chosenProfileName);
	}

	public async renameProfileCommand() {
		// 🕮 <cyberbiont> a56eac98-df44-4194-94ab-a0e952ad8fc4.md
		const oldName = await this.user.selectProfileName();
		const newName = await this.user.promptProfileName(oldName);

		await this.link.renameProfileFolder(oldName, newName).catch(this.on.error);

		await this.profiles.rescanProfiles();
		return window.showInformationMessage(
			`Renamed profile "${oldName}" to "${newName}"`,
		);
	}

	public async deleteProfileCommand() {
		// 🕮 <cyberbiont> 33336010-437b-4ac1-b264-9cd671cba40a.md
		const name = await this.user.selectProfileName();
		await this.link.deleteProfileFolder(name);
		this.profiles.deleteProfileEntry(name);
		return window.showInformationMessage(`Profile "${name}" is deleted!`);

	}

	public async maintenanceCommand() {
		return this.profiles.doProfileMaintenance();
	}

	public async rescanCommand() {
		const profile = await this.profiles.rescanProfiles().catch((e: Error) => {
			if (
				e instanceof this.errors.MissingSymlink ||
				e instanceof this.errors.BrokenSymlink
			) {
				this.repairExtensionsSymlink();
				return this.profiles.rescanProfiles();
			}
			throw e;
		});

		if (this.cfg.workspaceProfile && this.cfg.workspaceProfile !== profile.name)
			this.switchToProfile(profile.name);
	}

	public async cleanCommand() {
		// 🕮 <cyberbiont> 89f90333-ac82-490b-91bc-0b677bc643c3.md
		const extensionSymlinks = new Set(
			(
				await Promise.all(
					Array.from(this.profiles.map).map(profile =>
						this.link.getSubfoldersInfo(profile.name, {
							filter: EntryType.EXT_SYMLINK,
						}),
					),
				)
			)
				.flat()
				.map(dirent => dirent.name)
				.sort(),
		);
		const storedExtensions = await this.link.getStoredExtensions();
		const extraneousExtensions = storedExtensions.filter(
			dirent => !extensionSymlinks.has(dirent.name),
		);

		const resultsPromise = Promise.all(
			extraneousExtensions.map(this.link.deleteStoredExtension, this.link),
		);
		window.setStatusBarMessage(
			`$(sync~spin) Analyzing extensions...`,
			resultsPromise,
		);
		const results = await resultsPromise;

		window.showInformationMessage(
			`deleted ${results.length} extraneous extensions`,
		);
	}


	// ACTIONS
	// 🕮 <cyberbiont> 4936ede9-783b-465a-b760-56d1a0d858d3.md

	private async repairExtensionsSymlink() {
		// 🕮 <cyberbiont> f82fbca6-ca8e-4115-b1d5-3099018b5ca4.md
		const profile = await this.user.selectProfileName({
			placeholder: `it seems that symlink to your extension profile is broken.
			Choose what profile you want to activate`,
		});
		return this.link.switchLinkToProfile(profile);
	}

	private async switchToProfile(profileName: string) {
		await this.profiles.doProfileMaintenance(this.profiles.active.name);
		// 🕮 <cyberbiont> 7e1a1010-7d14-43a2-89af-cf7c41ebdcc2.md

		await this.link.switchLinkToProfile(profileName).catch(this.on.error);

		this.profiles.activateProfile(profileName);

		await commands
			.executeCommand(`settings.cycle.${profileName}`)
			.then(undefined, (e: Error) => {
				window.showWarningMessage(`There is no configuration registered in setting.json for this profile.
				You won't be able to sync your profile with settings sync!`);
			});

		window.showInformationMessage(
			`Switched to profile ${profileName}.`,
		);

		return setTimeout(
			commands.executeCommand.bind(null, `workbench.action.reloadWindow`),
			0,
		);
	}

	private async createNewProfileDirectory({
		useExisting = false,
	}: { useExisting?: boolean } = {}) {
		const name = await this.user.promptProfileName();
		await this.user.checkMatchWithCurrentProfile(name);
		await this.link.createProfileDirectory(name).catch((e: Error) => {
			if (e.name === `EEXIST` && !useExisting) throw e;
		});
		// await this.link.installLinkToVScodeProfilesExtension(name);
		await this.profiles.rescanProfiles();
		return Promise.resolve(name);
	}
}
