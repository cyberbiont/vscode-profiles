import Entry, { EntryType } from './entry';
import Errors, { ErrorHandlers } from './errors';
import { commands, window } from 'vscode';

import ProfilesRepository from './profilesRepository';
import User from './user';
import VpPaths from './paths';
import Status from './status';
import SettingsCycle from './settingsCycle';

export type OActions = {
	initial?: string;
	autoSwitch: {
		initial: boolean;
		created: boolean;
	};
};

export default class Actions {
	constructor(
		public cfg: OActions,
		public user: User,
		private entry: Entry,
		public p: VpPaths,
		public profiles: ProfilesRepository,
		public on: ErrorHandlers,
		public errors: Errors,
		public status: Status,
		public settingsCycle: SettingsCycle,
	) {}

	// COMMANDS
	public async createProfileCommand() {
		const newProfileName = await this.createNewProfileDirectory();
		// await this.entry
		// 	.symlinkThisExtensionToProfile(newProfileName)
		// 	.catch(this.on.error);
		await window.showInformationMessage(`Created profile ${newProfileName}`);
		if (this.cfg.autoSwitch.created) {
			this.switchToProfile(newProfileName);
		}
		// return this.switchToProfile(newProfileName);
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

		await this.entry.renameProfileFolder(oldName, newName).catch(this.on.error);

		await this.profiles.rescanProfiles();
		return window.showInformationMessage(
			`Renamed profile "${oldName}" to "${newName}"`,
		);
	}

	public async deleteProfileCommand() {
		// 🕮 <cyberbiont> 33336010-437b-4ac1-b264-9cd671cba40a.md
		const name = await this.user.selectProfileName();
		if (
			!(await this.user.confirm(
				`Are you sure you want to delete profile "${name}"?`,
			))
		)
			return undefined;
		await this.entry.deleteProfileFolder(name);
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

		if (this.cfg.autoSwitch.initial) {
			await this.switchToInitialProfile();
		}
	}
	public async switchToInitialProfile() {
		if (
			this.cfg.initial &&
			this.cfg.initial !== this.profiles.active.name
		)
			this.switchToProfile(this.cfg.initial);
	}

	public async cleanCommand() {
		// 🕮 <cyberbiont> 89f90333-ac82-490b-91bc-0b677bc643c3.md
		const extensionSymlinks = new Set(
			(
				await Promise.all(
					Array.from(this.profiles.map).map(profile =>
						this.entry.getSubfoldersInfo(profile.name, {
							filter: EntryType.EXT_SYMLINK,
						}),
					),
				)
			)
				.flat()
				.map(dirent => dirent.name)
				.sort(),
		);
		const storedExtensions = await this.entry.getStoredExtensions();
		const extraneousExtensions = storedExtensions.filter(
			dirent => !extensionSymlinks.has(dirent.name),
		);

		const resultsPromise = Promise.all(
			extraneousExtensions.map(this.entry.deleteStoredExtension, this.entry),
		);
		window.setStatusBarMessage(
			`$(sync~spin) Analyzing extensions...`,
			resultsPromise,
		);
		const results = await resultsPromise;

		window.showInformationMessage(
			`Deleted ${results.length} extraneous extensions`,
		);
	}

	// ACTIONS
	// 🕮 <cyberbiont> 4936ede9-783b-465a-b760-56d1a0d858d3.md

	private async repairExtensionsSymlink() {
		// 🕮 <cyberbiont> f82fbca6-ca8e-4115-b1d5-3099018b5ca4.md
		const profile = await this.user.selectProfileName({
			placeholder: `It seems that symlink to your extension profile is broken.
			Choose the profile you want to activate`,
		});
		return this.entry.switchLinkToProfile(profile);
	}

	private async switchToProfile(profileName: string) {
		await this.profiles.doProfileMaintenance(this.profiles.active.name);
		// 🕮 <cyberbiont> 7e1a1010-7d14-43a2-89af-cf7c41ebdcc2.md

		await this.entry.switchLinkToProfile(profileName).catch(this.on.error);

		this.profiles.activateProfile(profileName);

		this.settingsCycle.cycleSettings();

		this.status.update(`${this.status.get().slice(1)} -> ${profileName}`);
		// window.showInformationMessage(`Switched to profile ${profileName}.
		// The main window will be reloaded. Please reload all other VS Code windows, if you have them opened!`);

		return new Promise(res =>
			setTimeout(() => {
				commands.executeCommand(`workbench.action.reloadWindow`).then(res);
			}, 1000),
		);
	}

	private async createNewProfileDirectory({
		useExisting = false,
	}: { useExisting?: boolean } = {}) {
		const name = await this.user.promptProfileName();
		await this.user.checkMatchWithCurrentProfile(name);
		await this.entry.createProfileDirectory(name, {
			useExisting,
		});

		// 🕮 <cyberbiont> 42de7d84-b31d-4f82-a17d-8a835f50ed3e.md
		await this.entry.symlinkThisExtensionToProfile(name).catch(this.on.error);
		await this.entry.installCommonExtensions().catch(this.on.error);

		await this.profiles.rescanProfiles();
		return name;
	}
}
