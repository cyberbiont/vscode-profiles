import { URL } from 'url';
import path from 'path';
import os from 'os';
import fs from 'fs';
import url from 'url';

const homedir = os.homedir();

class Path extends URL {
	fsPath: string;
	constructor(input: string, base?: string | URL) {
		super(`file:${input}`, base);
		this.fsPath = url.fileURLToPath(this.href);
	}

	derive(...pathFragments: string[]) {
		// this.href = path.join(this.href, ...pathFragments);
		return new Path(path.normalize(path.join(this.pathname, ...pathFragments)));
	}
}

const base = new Path(path.join(homedir, '.vscode'));
base;

const extendedBase = base.derive('..', 'profilename');
extendedBase;
const text = 'current';

const up = `⚙ ${text.replace(/^\w/, (c) => c.toUpperCase())}`;
up;

(async function () {
	// fs.promises.symlink(
	// 	'/C:/Users/larin/.vscode/profiles/node',
	// 	'C:\\Users\\larin\\.vscode\\test',
	// 	'junction',
	// );
	let link = await fs.promises.readlink(
		// new Path(path.join(homedir, '.vscode', 'extensions')),
		new Path(path.join(homedir, '.vscode', 'extensions')),
	);
	if (link.endsWith('\\')) link = link.slice(0, -1);
	link;
})();
