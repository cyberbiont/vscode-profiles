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

// 🕮 <cyberbiont> 883f8be0-44ff-4555-a5af-b59e3216284f.md
export default class ConfigMaker {
	create(): Cfg {
		const cfg: Cfg = {
			initial: settings.get(`initial`) || undefined,
			autoSwitch: {
				initial: settings.get(`autoSwitch.initial`) || false,
				created: settings.get(`autoSwitch.created`) || false,
			},
			settingsCyclerWarning: settings.get(`settingsCyclerWarning`) || true,
			extensions: {
				symlinkify: settings.get(`extensions.symlinkify`) || true,
				// common: [...settings.get(`extensions.common`) as string[], `cyberbiont.vscode-profiles`] ?? undefined
				common: settings.get(`extensions.common`),
				blacklisted: settings.get(`extensions.blacklisted`)
			},
			paths: {
				profiles:
					settings.get(`paths.profiles`) ||
					path.join(homedir, `.vscode`, `profiles`),
				extensionsStandard: path.join(homedir, `.vscode`, `extensions`), // this is the folder where VSCode looks for extensions. It is dynamically re-directed via symlink to active profile folder
				extensionsStorage:
					settings.get(`paths.extensionsStorage`) ||
					path.join(homedir, `.vscode`, `extensions.storage`), // a folder to store all extensions (they are being symlinked from this folder)
			},
			developmentMode: settings.get(`developmentMode`) || false,
		};

		if (!cfg.developmentMode && cfg.extensions.common)
			cfg.extensions.common.push(`cyberbiont.vscode-profiles`);

		return cfg;
	}
}
