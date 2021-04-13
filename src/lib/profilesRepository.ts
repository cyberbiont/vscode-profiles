import Entry, {
	EntryMaintenanceStatus,
	MaintenanceResults as MaintenanceResult,
} from './entry';
import { FileSystemError, window } from 'vscode';

import { Dirent } from 'fs';
import Errors from './errors';
import Profile from './profile';
import { ProfilesDictionary } from './types';
import Status from './status';
import VpExtensions from './extensions';
import VpFileSystem from './fileSystem';
import VpOutputChannel from './outputChannel';
import VpPaths from './paths';

export type OProfilesRepository = {
	extensions: {
		symlinkify: boolean;
		common?: string[];
	};
	developmentMode: boolean;
};

export default class ProfilesRepository {
	public active!: Profile;

	constructor(
		private cfg: OProfilesRepository,
		public map: ProfilesDictionary,
		private fs: VpFileSystem,
		private p: VpPaths,
		private errors: Errors,
		private status: Status,
		private entry: Entry,
		private channel: VpOutputChannel,
		private extensions: VpExtensions,
	) {}

	async createInitialFoldersStructure() {
		await this.fs.createDirectory(this.p.profiles);
		await this.fs.rename(
			this.p.extensionsStandard,
			this.p.profiles.derive(`Default`),
		);
		await this.entry.switchLinkToProfile(`Default`);
	}

	async rescanProfiles() {
		this.map.clear();

		let profilesFolderContents: Dirent[] | void;
		profilesFolderContents = await this.getProfilesDirectoryValue().catch(e => {
			if (e instanceof this.errors.MissingProfilesFolder) {
				this.createInitialFoldersStructure();
			} else throw e;
		});
		if (profilesFolderContents) {
			await Promise.all(
				profilesFolderContents.map(this.createProfileEntry.bind(this)),
			);

			// 🕮 <cyberbiont> 1d69ce98-a60e-4429-b2c6-4143f1489c3c.md

			return this.initActiveProfile();
		}
	}

	private async createProfileEntry(dirent: Dirent) {
		if (
			dirent.isDirectory()
			// && this.isProfileDirectory(dirent)
		) {
			const profile = new Profile(
				dirent.name,
				this.p.profiles.derive(dirent.name),
			);

			this.map.add(profile.name, profile);
		}
		// 🕮 <cyberbiont> 298548eb-4aa1-42ae-9046-52b0d893fdee.md
	}

	// 🕮 <cyberbiont> a9aabcec-9de4-47a3-a9b6-72942c2819c7.md

	private async initActiveProfile() {
		const swapperLink = await this.getSwapperLinkValue();
		const profile = await this.findCorrespondingProfile(swapperLink);
		this.setActiveProfile(profile);
		this.status.show();
		return profile;
	}

	async checkCommonExtensions() {
		const installedExtensions = await this.gatherProfileExtensions(
			this.active.name,
		);

		// 🕮 <cyberbiont> 42de7d84-b31d-4f82-a17d-8a835f50ed3e.md

		if (this.cfg.developmentMode) {
			if (!installedExtensions.includes(`vscode`))
				await this.entry.symlinkThisExtensionToProfile(this.active.name).catch;
		}

		if (this.cfg.extensions.common) {
			for (const id of this.cfg.extensions.common) {
				if (!installedExtensions.includes(id)) {
					await this.extensions.installExtension(id);
					installedExtensions.push(id);
				}
			}
		}

		return installedExtensions;
	}

	private async findCorrespondingProfile(link: string) {
		const result = Array.from(this.map).find(
			profile => profile.path.fsPath === link,
		);
		if (result) return result;
		throw new this.errors.BrokenSymlink(
			`swapper symlink path value is not in the known profiles list`,
		);
	}

	private getSwapperLinkValue() {
		return this.fs.symlinkRead(this.p.extensionsStandard).catch(e => {
			if (e.code === `UNKNOWN`) throw new this.errors.IsDirectory();
			if (e.code === `ENOENT`) throw new this.errors.MissingSymlink();
			throw e;
		});
	}

	private getProfilesDirectoryValue() {
		return this.fs.readDirectory(this.p.profiles).catch(e => {
			if (e.code === `ENOENT`) throw new this.errors.MissingProfilesFolder();
			throw e;
		});
	}

	private setActiveProfile(profile: Profile) {
		this.active = profile;
		this.status.update(profile.name);
	}

	getActiveProfile() {
		return this.active;
	}

	deleteProfileEntry(name: string) {
		return this.map.delete(name);
	}

	activateProfile(profile: string) {
		const listedProfile = this.searchProfileInMap(profile);
		this.active = listedProfile;
		return this.active;
	}

	searchProfileInMap(profile: string) {
		const result = this.map.get(profile);
		if (result) return result;
		throw new this.errors.MissingProfilesFolder(
			`profile name was not found in profiles list`,
		);
	}

	getProfileNames(): string[] {
		return [...this.map.list.keys()];
	}

	async gatherProfileExtensions(profileFolderName: string = this.active.name) {
		// TODO 🕮 <cyberbiont> 97b7cd5b-893c-423d-9d5d-44ff5758fcb8.md
		const subfoldersInfo = await this.entry.getSubfoldersInfo(
			profileFolderName,
		);
		// const settingCyclerInstalled = subfoldersInfo.find(dirent => {
		// 	return this.extensions.isSettingsCyclerExtension(dirent.name);
		// });

		return subfoldersInfo.map(dirent =>
			this.extensions.getExtensionId(dirent.name),
		);
	}

	async doProfileMaintenance(profileFolderName: string = this.active.name) {
		// 🕮 <cyberbiont> f7ea2dc2-10d1-4915-8cb2-4b6aa3c3fff0.md
		// 🕮 <cyberbiont> b2fcd0c9-db59-4981-ae8a-bbba8edbbedd.md
		if (!this.cfg.extensions.symlinkify) return;

		const subfoldersInfo = await this.entry.getSubfoldersInfo(
			profileFolderName,
		);
		const profileIsActive = profileFolderName === this.active.name;

		const maintenanceCallback = (subfolderInfo: Dirent) =>
			this.entry.doProfileFolderMaintenance(
				subfolderInfo,
				profileFolderName,
				profileIsActive,
			);
		// 🕮 <cyberbiont> dc048b9a-fbd3-4fa9-a1d7-a788496019ec.md

		const resultsPromise = Promise.all(subfoldersInfo.map(maintenanceCallback));
		window.setStatusBarMessage(
			`$(sync~spin) Analyzing profile...`,
			resultsPromise,
		);
		const results = await resultsPromise;
		this.analyzeMaintenanceResults(results);

		// .then(commands => commands.forEach(command => this.channel.appendLine(command)));
	}

	analyzeMaintenanceResults(results: MaintenanceResult[]) {
		let okCount = 0;
		let repairedCount = 0;
		let symlinkifiedCount = 0;

		results.forEach(result => {
			if (result.status.includes(EntryMaintenanceStatus.WAS_OK)) okCount++;
			if (result.status.includes(EntryMaintenanceStatus.WAS_REPAIRED))
				repairedCount++;
			if (result.status.includes(EntryMaintenanceStatus.WAS_SYMLINKIFIED))
				symlinkifiedCount++;
		});
		// const symlinkified = results.filter((result) => Boolean(result));
		// window.showInformationMessage
		this.channel.appendLine(
			`total: ${results.length};
replaced with simlinks: ${symlinkifiedCount};
repaired: ${repairedCount};
ok: ${okCount}`,
		);
	}

	// 🕮 <cyberbiont> 3f4ef8d9-9102-4804-ba76-3c5a680e11fe.md

	async copyProfileContents(
		srcProfileFolderName: string,
		destProfileFolderName: string,
	) {
		const subfoldersInfo = await this.entry.getSubfoldersInfo(
			srcProfileFolderName,
		);
		return Promise.all(
			subfoldersInfo.map(subfolderInfo =>
				this.entry.copyProfileContent(
					subfolderInfo,
					srcProfileFolderName,
					destProfileFolderName,
				),
			),
		);
	}
}
