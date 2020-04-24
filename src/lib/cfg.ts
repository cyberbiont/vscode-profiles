import { workspace } from 'vscode';
import { OActions } from './actions';
import path from 'path';

const homedir: string = require('os').homedir();
const settings = workspace.getConfiguration('sidenotes');

export type Cfg = OActions;
const cfg: Cfg = {
	paths: {
		profiles:
			settings.get('profilesPath') || path.join(homedir, '.vscode', 'profiles'),
		extensionsStandard: path.join(homedir, '.vscode', 'extensions'),
		extensionsStorage: path.join(homedir, '.vscode', 'extensions.storage'),
		// 🕮 <cyberbiont> 7bb6d843-59e8-48f3-a02d-d0fd28b547ba.md
	},
};

export default cfg;
