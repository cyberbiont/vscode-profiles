import VpPaths from './paths';
import VpFileSystem from './fileSystem';
import Profile from './profile';
import { ProfilesDictionary } from './types';
import { errorsLibrary } from './errors';
import { Dirent } from 'fs';
import { window } from 'vscode';

export type OProfilesRepository = {};

export default class ProfilesRepository {
	public active: Profile;
	constructor(
		private cfg: OProfilesRepository,
		public map: ProfilesDictionary,
		private fs: VpFileSystem,
		private p: VpPaths,
		private errors: ReturnType<typeof errorsLibrary>,
	) {
		this.rescanProfiles();
		// .catch((e) => {
		// 	window.showErrorMessage("Wasn't been able to initialize active profile");
		// 	throw e;
		// });
	}

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
		return profile;
	}

	private async findCorrespondingProfile(link: string) {
		// надо проверить не только что папка, на которую указывает swapper, существует, но и то что она именно среди папок в profiles, а не какая-то левая папка
		console.log(link);
		const result = Array.from(this.map).find(
			(profile) => profile.path.fsPath === link,
		); // (profile) => false, //имитируем ошибку
		if (result) return result;
		else
			throw new this.errors.BrokenSymlink(
				'swapper symlink path value is not in the known profiles list',
			);
		// надо сразу же починить, но обработать нужно уже в actions
		// в данный момент это может быть как ссылка на несуществующую папку, так и ссылка на папку за пределами папки profiles, нам все равно на самом деле
	}

	private async getSwapperLinkValue() {
		return this.fs.symlinkRead(this.p.extensionsStandard).catch((e) => {
			if (e.code === 'UNKNOWN') throw new this.errors.IsDirectory();
			if (e.code === 'ENOENT') throw new this.errors.MissingSymlink();
			// else console.log(e);
			throw e;
		});
	}

	setActiveProfile(profile: Profile) {
		this.active = profile;
	}
	getActiveProfile() {
		// await this.validateSwapperLink();
		return this.active;
	}

	deleteProfileEntry(name: string) {
		return this.map.delete(name);
	}

	activateProfile(profile: string) {
		const listedProfile = this.searchProfileInMap(profile);
		this.active = listedProfile;
	}

	// async detectActiveProfile(profile: Profile) {
	// 	const linkedProfileName = await this.getCurrentProfileName();
	// 	// if (this.map.has(linkedProfileName))
	// 	const result = this.map.get(linkedProfileName);
	// 	if (result) this.active = result;
	// 	else {
	// 		throw new this.errors.ExtensionSymlinkError(
	// 			'error trying to detect active profile, "extensions" symlink seems to be broken',
	// 		);
	// 		// window.showWarningMessage('You "extensions" symlink seems to point to non existent directory');
	// 	}
	// }

	searchProfileInMap(profile: string) {
		const result = this.map.get(profile);
		if (result) return result;
		else
			throw new this.errors.MissingProfileFolder(
				'profile name was not found in profiles list',
			);
	}

	getProfileNames(): string[] {
		return [...this.map.list.keys()];
	}
}
