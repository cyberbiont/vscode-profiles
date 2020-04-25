import VpPaths from './paths';
import VpFileSystem from './fileSystem';
import Profile from './profile';
import { ProfilesDictionary } from './types';
import { Uri } from 'vscode';

export type OProfilesRepository = {
	paths: {
		profiles: Uri;
	};
};

export default class ProfilesRepository {
	constructor(
		private cfg: OProfilesRepository,
		public map: ProfilesDictionary,
		private fs: VpFileSystem,
		private p: VpPaths,
	) {
		this.rescanProfiles();
	}

	async rescanProfiles() {
		this.map.clear();

		const results = await this.fs.readDirectory(this.cfg.paths.profiles);

		results.forEach((result) => {
			const [folder, type] = result;
			if (type !== 2) return;
			const fileName = this.p.getBasename(folder);

			const profile = new Profile(fileName);
			this.map.add(fileName, profile);
		});
	}

	getProfileNames(): string[] {
		return [...this.map.list.keys()];
	}
}
