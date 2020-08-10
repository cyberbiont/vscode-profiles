import Errors from "./errors";
import ProfilesRepository from "./profilesRepository";
import Utils from "./utils";
import { window } from "vscode";

export default class User {
	constructor(
		private utils: Utils,
		private profiles: ProfilesRepository,
		private errors: Errors,
	) {}

	async selectProfileName({
		filterOutActive = true,
		placeholder = ``,
	}: { filterOutActive?: boolean; placeholder?: string } = {}) {
		let profiles = this.profiles.getProfileNames();

		if (filterOutActive && this.profiles.active)
			profiles = profiles.filter(
				(profileName) => !(profileName === this.profiles.active.name),
			);

		const response = await window.showQuickPick(
			profiles.map((ext) => ({
				label: `⚙ ${this.utils.capitalize(ext)}`,
			})),
			{
				placeHolder: placeholder || `⚙ ${this.profiles.active?.name}`, // ?. doesn't work in default parameters due to the bug
			},
		);
		
		if (!response) throw new this.errors.InteractionError(`selectProfileName`);
		else return response.label.slice(2);
	}

	async promptProfileName(placeholder?: string) {
		const name = await window.showInputBox({
			prompt: `Enter the name of the profile`,
			value: placeholder || ``,
		});
		if (!name) throw new this.errors.InteractionError(`promptProfileName`);
		else return this.utils.capitalize(name);
	}

	async checkMatchWithCurrentProfile(profileName: string) {
		if (profileName === this.profiles.active.name) {
			window.showInformationMessage(`This is your current profile`);
			throw new this.errors.InteractionError(
				`selected profile name matches current profile`,
			);
		}
		return Promise.resolve(); // надо возвращать всегда что-то, иначе промис вечно висит как pending
	}
}
