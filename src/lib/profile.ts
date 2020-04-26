import { Uri } from 'vscode';
import { Path } from './paths';

enum ExtensionState {
	Folder,
	Symlink,
}

interface Extension {
	name: string;
	state: ExtensionState;
	obsolete: boolean;
	info: {};
}

interface ProfileMeta {
	description: string;
}

export default class Profile {
	constructor(
		public name: string,
		public path: Path,
		public extensions?: Extension[],
		public meta?: ProfileMeta,
	) {}
	// TODO 🕮 <cyberbiont> 3d686927-0a16-4e43-9595-4633c160bce1.md
}
