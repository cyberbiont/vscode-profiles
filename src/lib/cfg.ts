import { OActions } from './actions';
import { OLink } from './link';
import { OPaths } from './paths';
import { OProfilesRepository } from './profilesRepository';
import os from 'os';
import path from 'path';
import { workspace } from 'vscode';

const homedir = os.homedir();
const settings = workspace.getConfiguration(`sidenotes`);

export type Cfg = OActions & OLink & OPaths & OProfilesRepository;

export default class ConfigMaker {
	create(): Cfg {
		return {
			extensions: {
				symlinkifyExtensions: settings.get(`symlinkifyExtensions`) || true,
			},
			workspaceProfile: settings.get(`workspaceProfile`) || undefined,
			autoSwitchToWorkspaceProfile: settings.get(`workspaceProfile`) || true,
			paths: {
				profiles:
					settings.get(`profilesPath`) ||
					path.join(homedir, `.vscode`, `profiles`),
				extensionsStandard: path.join(homedir, `.vscode`, `extensions`),
				extensionsStorage: settings.get(`extensionsStorage`) || path.join(homedir, `.vscode`, `extensions.storage`),
			},
		};
	}
}
