import path, { PlatformPath } from "path";
import url, { URL } from "url";

export type OPaths = {
	paths: {
		profiles: string;
		extensionsStandard: string;
		extensionsStorage: string;
	};
};

export class Path extends URL {
	fsPath: string;
	// в класс URL нет такого fsPath, как в Uri VScode, чтобы именно учитывал обратные слэши и все такое,
	// поэтому приходится создать такое св-во

	constructor(input: string, base?: string | URL) {
		super(`file:${input}`, base);
		this.fsPath = url.fileURLToPath(this.href);
	}

	derive(...pathFragments: string[]) {
		// 🕮 <cyberbiont> 8e1114ea-4a94-4880-8ce1-1d8717005d1b.md
		return new Path(path.normalize(path.join(this.pathname, ...pathFragments)));
	}
}

export default class VpPaths {
	readonly profiles: Path;
	readonly extensionsStandard: Path;
	readonly extensionsStorage: Path;

	// 🕮 <cyberbiont> cd5e6c27-ae12-4fbb-b850-28521f7d83c6.md

	constructor(public cfg: OPaths, private pPath: PlatformPath = path) {
		this.profiles = new Path(this.cfg.paths.profiles);
		this.extensionsStandard = new Path(this.cfg.paths.extensionsStandard);
		this.extensionsStorage = new Path(this.cfg.paths.extensionsStorage);
	}

	// uriJoin(uri: Uri, ...pathFragments: string[]) {
	// 	return uri.joinPath(...pathFragments)
	// }

	// extend(uri: Uri, ...pathFragments: string[]) {
	// 	//! 🕮 <cyberbiont> ba729b18-2140-42bc-bea8-2843fceb530f.md
	// 	return Uri.parse(
	// 		`file:${this.pPath.join(uri.fsPath, ...pathFragments)}`,
	// 		true,
	// 	);
	// }

	// getUri(path: string) {
	// 	// return new URL(path);
	// 	return Uri.parse(`file:${path}`, true);
	// }

	// getBasename(folder: string) {
	// 	return this.pPath.basename(folder);
	// }

	// join(...pathFragments: string[]) {
	// 	return this.pPath.join(...pathFragments);
	// }
}
