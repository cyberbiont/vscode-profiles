import { window } from 'vscode';
import ProfilesRepository from './profilesRepository';
import { errorsLibrary } from './errors';

export default class User {
	constructor(
		private pool: ProfilesRepository,
		private errors: ReturnType<typeof errorsLibrary>,
	) {}

	async selectProfileName() {
		const profiles = this.pool.getProfileNames();
		const response = await window.showQuickPick(
			profiles.map((ext) => ({
				label: ext,
			})),
			{
				placeHolder: `select profile`,
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
}
