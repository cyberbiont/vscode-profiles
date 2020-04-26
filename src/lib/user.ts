import { window } from 'vscode';
import ProfilesRepository from './profilesRepository';
import { errorsLibrary } from './errors';

export default class User {
	constructor(
		private profiles: ProfilesRepository,
		private errors: ReturnType<typeof errorsLibrary>,
	) {}

	async selectProfileName({
		activeIsChoosable = false,
	}: { activeIsChoosable?: boolean } = {}) {
		let profiles = this.profiles.getProfileNames();
		if (!activeIsChoosable)
			profiles = profiles.filter(
				(profileName) => !(profileName === this.profiles.active.name),
			);
		const response = await window.showQuickPick(
			profiles.map((ext) => ({
				label: ext,
			})),
			{
				placeHolder: `select profile. <${this.profiles.active.name}>`,
			},
		);
		if (!response) throw new this.errors.InteractionError('selectProfileName');
		else return response.label;
	}

	async promptProfileName(placeholder?: string) {
		const response = await window.showInputBox({
			prompt: 'Enter the name of the profile',
			value: placeholder || '',
		});
		if (!response) throw new this.errors.InteractionError('promptProfileName');
		else return response;
	}

	async checkMatchWithCurrentProfile(profileName: string) {
		if (profileName === this.profiles.active.name) {
			window.showInformationMessage('This is your current profile');
			throw new this.errors.InteractionError(
				'selected profile name matches current profile',
			);
		}
	}
}
