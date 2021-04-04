import { commands, window } from 'vscode';
import { Cfg } from './cfg';
import ProfilesRepository from './profilesRepository';

export type OSettingsCycle = {
	warnAboutNoSettings: boolean;
};

export default class SettingsCycle {
	constructor(public profiles: ProfilesRepository, public cfg: Cfg) {}

	public async cycleSettings() {
		await commands
			.executeCommand(`settings.cycle.${this.profiles.active.name}`)
			.then(undefined, (e: Error) => {
				console.log(e);
				if (
					e.message ===
					`command 'settings.cycle.${this.profiles.active.name}' not found`
				) {
					if (this.cfg.warnAboutNoSettings) {
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
