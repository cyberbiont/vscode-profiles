import { workspace, Uri } from 'vscode';
import { OActions } from './actions';
import { OLink } from './link';
import VpPaths from './paths';
import os from 'os';

const homedir = os.homedir();
const settings = workspace.getConfiguration('sidenotes');

export type Cfg = OActions & OLink;

export default class ConfigMaker {
	constructor(private p: VpPaths) {}
	create(): Cfg {
		return {
			paths: {
				profiles: this.p.getUri(
					settings.get('profilesPath') ||
						this.p.join(homedir, '.vscode', 'profiles'),
				),
				extensionsStandard: this.p.getUri(
					this.p.join(homedir, '.vscode', 'extensions'),
				),
				extensionsStorage: this.p.getUri(
					this.p.join(homedir, '.vscode', 'extensions.storage'),
				),
				// 🕮 <cyberbiont> a095c6a5-7401-4996-80cf-f9d9bcde283a.md
				// settings sync 🕮 <cyberbiont> 7bb6d843-59e8-48f3-a02d-d0fd28b547ba.md
			},
		};
	}
}
