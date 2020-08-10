import ProfilesRepository from './profilesRepository';

export default class VpEvents {
	constructor(private profiles: ProfilesRepository) {}

	async onExtensionsChange() {
		return this.profiles.doProfileMaintenance(this.profiles.active.name);
	}
}
