import VpPaths from './paths';
import VpFileSystem from './fileSystem';
import Profile from './profile';
import path from 'path';
import { ProfilesDictionary } from './types';

export type OProfilesRepository = {
	paths: {
		profiles: string;
	};
};

export default class ProfilesRepository {
	constructor(
		private cfg: OProfilesRepository,
		public map: ProfilesDictionary,
		private paths: VpPaths,
		private fs: VpFileSystem,
	) {
		this.rescanProfiles();
	}

	async rescanProfiles() {
		this.map.clear();

		const results = await this.fs.readDirectory(
			this.paths.getUri(this.cfg.paths.profiles),
		);

		results.forEach((result) => {
			const [folder, type] = result;
			if (type !== 2) return;
			const fileName = path.basename(folder);

			const profile = new Profile(fileName);
			this.map.add(fileName, profile);
		});
	}

	getProfileNames(): string[] {
		return [...this.map.list.keys()];
	}
}
