import path from 'path';
import { Uri } from 'vscode';

export default class VpPaths {
	constructor() {}

	getUri(path: string): Uri {
		return Uri.parse(`file:${path}`, true);
	}

	join(...paths: string[]) {
		return path.join(...paths);
	}

	joinToUri(...paths: string[]) {
		return this.getUri(this.join(...paths));
	}

	getBasename(folder: string) {
		return path.basename(folder);
	}
}
