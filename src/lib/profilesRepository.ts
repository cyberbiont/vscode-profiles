import Link, {
	LinkMaintenanceStatus,
	MaintenanceResults as MaintenanceResult,
} from "./link";

import { Dirent } from "fs";
import Errors from "./errors";
import Profile from "./profile";
import { ProfilesDictionary } from "./types";
import Status from "./status";
import VpExtensions from "./extensions";
import VpFileSystem from "./fileSystem";
import VpPaths from "./paths";
import { window } from "vscode";

export type OProfilesRepository = {
	extensions: {
		symlinkifyExtensions: boolean
	}
};

export default class ProfilesRepository {
	public active: Profile;

	constructor(
		private cfg: OProfilesRepository,
		public map: ProfilesDictionary,
		private fs: VpFileSystem,
		private p: VpPaths,
		/* private errors: ReturnType<typeof errorsLibrary>, */
		private errors: Errors,
		private status: Status,
		private link: Link,
		private extensions: VpExtensions,
	) {}

	async rescanProfiles() {
		this.map.clear();

		const profilesFolderContents = await this.fs.readDirectory(this.p.profiles);

		await Promise.all(
			profilesFolderContents.map(this.createProfileEntry.bind(this)),
		);

		return this.initActiveProfile();
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
			// scan for extensions?
			this.map.add(profile.name, profile);
		}
		// 🕮 <cyberbiont> 298548eb-4aa1-42ae-9046-52b0d893fdee.md
	}

	private isProfileDirectory(dirent: Dirent) {
		return true;
		// TODO check if it really profile directory (read meta?)
	}

	private async initActiveProfile() {
		const swapperLink = await this.getSwapperLinkValue();
		const profile = await this.findCorrespondingProfile(swapperLink);
		this.setActiveProfile(profile);
		this.status.show();
		return profile;
	}

	private async findCorrespondingProfile(link: string) {
		// надо проверить не только что папка, на которую указывает swapper, существует, но и то что она именно среди папок в profiles, а не какая-то левая папка
		// console.log(link);
		const result = Array.from(this.map).find(
			(profile) => profile.path.fsPath === link,
		); // (profile) => false, // имитируем ошибку
		if (result) return result;
		throw new this.errors.BrokenSymlink(
			`swapper symlink path value is not in the known profiles list`,
		);
	}

	private async getSwapperLinkValue() {
		return this.fs.symlinkRead(this.p.extensionsStandard).catch((e) => {
			if (e.code === `UNKNOWN`) throw new this.errors.IsDirectory();
			if (e.code === `ENOENT`) throw new this.errors.MissingSymlink();
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
	}

	searchProfileInMap(profile: string) {
		const result = this.map.get(profile);
		if (result) return result;
		throw new this.errors.MissingProfileFolder(
			`profile name was not found in profiles list`,
		);
	}

	getProfileNames(): string[] {
		return [...this.map.list.keys()];
	}

	async doProfileMaintenance(profileFolderName: string = this.active.name) {
		// 🕮 <cyberbiont> f7ea2dc2-10d1-4915-8cb2-4b6aa3c3fff0.md
		// 🕮 <cyberbiont> b2fcd0c9-db59-4981-ae8a-bbba8edbbedd.md
		if (!this.cfg.extensions.symlinkifyExtensions) return;
		const subfoldersInfo = await this.link.getSubfoldersInfo(profileFolderName);
		const profileIsActive = profileFolderName === this.active.name;
		const maintenanceCallback = (subfolderInfo: Dirent) =>
			this.link.doMaintenance(
				subfolderInfo,
				profileFolderName,
				profileIsActive,
			);
		// sequential
		// const results: MaintenanceResult[] = [];
		// for (const subfolderInfo of subfoldersInfo) {
		// 	results.push(await maintenanceCallback(subfolderInfo));
		// }

		// parallel
		const results = await Promise.all(subfoldersInfo.map(maintenanceCallback));

		this.analyzeMaintenanceResults(results);
		return subfoldersInfo;
	}

	analyzeMaintenanceResults(results: MaintenanceResult[]) {
		console.log(results);
		let okCount = 0;
		let repairedCount = 0;
		let symlinkifiedCount = 0;
		results.forEach((result) => {
			if (result.status.includes(LinkMaintenanceStatus.WAS_OK)) okCount++;
			if (result.status.includes(LinkMaintenanceStatus.WAS_REPAIRED))
				repairedCount++;
			if (result.status.includes(LinkMaintenanceStatus.WAS_SYMLINKIFIED))
				symlinkifiedCount++;
		});
		// const symlinkified = results.filter((result) => Boolean(result));
		window.showInformationMessage(
			`total: ${results.length};
			replaced with simlinks: ${symlinkifiedCount};
			repaired: ${repairedCount};
			ok: ${okCount}`,
		);
	}
}
