import { OActions } from './actions';
import { OEntry } from './entry';
import { OPaths } from './paths';
import { OProfilesRepository } from './profilesRepository';
import os from 'os';
import path from 'path';
import { workspace } from 'vscode';
import { OSettingsCycle } from './settingsCycle';
import { OUser } from './user';

const homedir = os.homedir();
const settings = workspace.getConfiguration(`profiles`);

export type Cfg = OActions &
	OEntry &
	OPaths &
	OProfilesRepository &
	OSettingsCycle &
	OUser;

export default class ConfigMaker {
	create(): Cfg {
		return {
			initialProfile: settings.get(`initialProfile`) ?? undefined,
			autoSwitchToInitialProfile:
				settings.get(`autoSwitchToInitialProfile`) ?? true,
			autoSwitchToCreatedProfile:
				settings.get(`autoSwitchToCreatedProfile`) ?? false,
			warnAboutNoSettings: settings.get(`warnAboutNoSettings`) ?? true,
			extensions: {
				symlinkifyExtensions: settings.get(`symlinkifyExtensions`) ?? true,
			},
			paths: {
				profiles:
					settings.get(`profilesPath`) ??
					path.join(homedir, `.vscode`, `profiles`),
				extensionsStandard: path.join(homedir, `.vscode`, `extensions`), // this is the folder where VSCode looks for extensions. It is dynamically re-directed via symlink to active profile folder
				extensionsStorage:
					settings.get(`extensionsStorage`) ??
					path.join(homedir, `.vscode`, `extensions.storage`), // a folder to store all extensions (they are being symlinked from this folder)
			},
			thisExtensionFolderName: `vscode-profiles`,
		};
	}
}
