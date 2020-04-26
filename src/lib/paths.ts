import path, { PlatformPath } from 'path';
import { Uri } from 'vscode';
import { URL } from 'url';

export default class VpPaths {
	constructor(private pPath: PlatformPath = path) {}

	extendUriPath(uri: Uri, ...pathFragments: string[]) {
		//! 🕮 <cyberbiont> ba729b18-2140-42bc-bea8-2843fceb530f.md
		return Uri.parse(
			`file:${this.pPath.join(uri.fsPath, ...pathFragments)}`,
			true,
		);
	}

	getUri(path: string) {
		// return new URL(path);
		return Uri.parse(`file:${path}`, true);
	}

	getBasename(folder: string) {
		return this.pPath.basename(folder);
	}

	join(...pathFragments: string[]) {
		return this.pPath.join(...pathFragments);
	}
}
