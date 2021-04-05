import { commands, window } from 'vscode';
import { Cfg } from './cfg';
import ProfilesRepository from './profilesRepository';
import VpFileSystem from './fileSystem';
import VpPaths from './paths';

export type OSettingsCycle = {
	settingsCyclerWarning: boolean;
};

export default class SettingsCycle {
	constructor(
		private profiles: ProfilesRepository,
		private fs: VpFileSystem,
		public p: VpPaths,
		private cfg: Cfg,
	) {}

	public async cycleSettings() {
		// 🕮 <cyberbiont> 3abf9004-2550-4021-af34-e23a92f50dd3.md
		if (
			this.fs.exists(this.p.profiles.derive(this.profiles.active.name).fsPath)
		) {
			await commands
				.executeCommand(`settings.cycle.${this.profiles.active.name}`)
				.then(undefined, (e: Error) => {
					console.log(e);
					if (
						e.message ===
						`command 'settings.cycle.${this.profiles.active.name}' not found`
					) {
						if (this.cfg.settingsCyclerWarning) {
							window.showWarningMessage(`There is no configuration registered in setting.json for this profile.
          You won't be able to sync your profile with settings sync!`);
							return;
						}
						return;
					}
					throw e;
				});
		}
	}
}
