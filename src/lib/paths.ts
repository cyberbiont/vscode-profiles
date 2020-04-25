import path, { PlatformPath } from 'path';
import { Uri } from 'vscode';

export default class VpPaths {
	constructor(private pPath: PlatformPath = path) {}

	extendUriPath(uri: Uri, ...pathFragments: string[]) {
		// 🕮 <cyberbiont> ba729b18-2140-42bc-bea8-2843fceb530f.md
		return Uri.parse(
			`file:${this.pPath.join(uri.fsPath, ...pathFragments)}`,
			true,
		);

		// return uri.with({ path: this.pPath.join(uri.path, ...pathFragments) });
	}

	getUri(path: string) {
		return Uri.parse(`file:${path}`, true);
	}

	getBasename(folder: string) {
		return this.pPath.basename(folder);
	}

	join(...pathFragments: string[]) {
		return this.pPath.join(...pathFragments);
	}
}
