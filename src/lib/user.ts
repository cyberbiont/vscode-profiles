import { Cfg } from './cfg';
import Errors from './errors';
import ProfilesRepository from './profilesRepository';
import Utils from './utils';
import { window } from 'vscode';

export type OUser = {
	initial?: string;
};

export default class User {
	constructor(
		private utils: Utils,
		private profiles: ProfilesRepository,
		private errors: Errors,
		private cfg: Cfg,
	) {}

	async confirm(message: string) {
		const confirmation = await window.showQuickPick([`No`, `Yes`], {
			placeHolder: message,
		});
		return confirmation === `Yes`;
	}

	async selectProfileName({
		filterOutActive = true,
		placeholder = ``,
	}: { filterOutActive?: boolean; placeholder?: string } = {}) {
		let profiles = this.profiles.getProfileNames();

		if(!profiles.length) throw this.errors.NoProfiles;

		if (filterOutActive && this.profiles.active)
			profiles = profiles.filter(
				profileName => !(profileName === this.profiles.active.name),
			);

		const response = await window.showQuickPick(
			profiles.map(name => {
				if (this.cfg.initial && name === this.cfg.initial)
					return {
						label: `⛮ ${this.utils.capitalize(name)}`,
					};
				return {
					label: `⛭ ${this.utils.capitalize(name)}`,
				};
			}),
			{
				placeHolder: placeholder ?? `⚙ ${this.profiles.active?.name}`,
			},
		);

		if (!response)
			throw new this.errors.InteractionError(`User canceled profile selection`);
		else return response.label.slice(2);
	}

	async promptProfileName(placeholder?: string) {
		const name = await window.showInputBox({
			prompt: `Enter the name of the profile`,
			value: placeholder ?? ``,
		});
		if (!name)
			throw new this.errors.InteractionError(`profile name was not entered`);
		else return this.utils.capitalize(name);
	}

	async checkMatchWithCurrentProfile(profileName: string) {
		if (profileName === this.profiles.active.name) {
			window.showInformationMessage(`This is your current profile`);
			throw new this.errors.InteractionError(
				`selected profile name matches current profile`,
			);
		}
	}
}
