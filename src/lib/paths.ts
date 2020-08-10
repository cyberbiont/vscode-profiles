import path, { PlatformPath } from 'path';
import url, { URL } from 'url';

export type OPaths = {
	paths: {
		profiles: string;
		extensionsStandard: string;
		extensionsStorage: string;
	};
};

export class Path extends URL {
	fsPath: string;
	// 🕮 <cyberbiont> 7cef990c-bce1-47f4-af2a-f222f2affb64.md

	constructor(input: string, base?: string | URL) {
		super(`file:${input}`, base);
		this.fsPath = url.fileURLToPath(this.href);
	}

	derive(...pathFragments: string[]) {
		return new Path(path.normalize(path.join(this.pathname, ...pathFragments)));
	}
}

export default class VpPaths {
	readonly profiles: Path;
	readonly extensionsStandard: Path;
	readonly extensionsStorage: Path;


	constructor(public cfg: OPaths, private pPath: PlatformPath = path) {
		this.profiles = new Path(this.cfg.paths.profiles);
		this.extensionsStandard = new Path(this.cfg.paths.extensionsStandard);
		this.extensionsStorage = new Path(this.cfg.paths.extensionsStorage);
	}
}
