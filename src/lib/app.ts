import { commands, ExtensionContext } from 'vscode';
import ConfigMaker from './cfg';
import Actions from './actions';
import ProfilesRepository from './profilesRepository';
import User from './user';
import VpPaths from './paths';
import VpFileSystem from './fileSystem';
import MapDictionary from './mapDictionary';
import { ProfilesDictionary } from './types';
import { errorsLibrary, errorHandlers } from './errors';
import Link from './link';

export default class App {
	public actions: Actions;
	// private events: SnEvents;

	constructor(
		private context: ExtensionContext,
		private resolveAppInit: Function,
	) {
		this.init();
	}

	async init() {
		await this.compose();
		// this.checkRequirements();
		// this.registerProviders();

		this.registerCommands();
		this.setEventListeners();
		// await this.actions.rescanCommand();
		this.resolveAppInit();
	}

	async compose() {
		const errors = errorsLibrary();
		const on = errorHandlers();
		const cfg = new ConfigMaker().create();
		const p = new VpPaths(cfg);
		const fs = new VpFileSystem(cfg, errors);
		const link = new Link(cfg, fs, p, on, errors);
		const map: ProfilesDictionary = new MapDictionary();
		const profiles = new ProfilesRepository(cfg, map, fs, p, errors);
		const userInteractions = new User(profiles, errors);
		const actions = new Actions(
			cfg,
			userInteractions,
			link,
			p,
			profiles,
			on,
			errors,
		);
		this.actions = actions;
	}

	setEventListeners(): void {}

	registerCommands(): number {
		// The command has been defined in the package.json file
		// Now provide the implementation of the command with registerCommand
		// The commandId parameter must match the command field in package.json
		return this.context.subscriptions.push(
			commands.registerCommand(
				'vscode-profiles.switch',
				this.actions.switchProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.create',
				this.actions.createProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.clone',
				this.actions.cloneProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.rename',
				this.actions.renameProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.delete',
				this.actions.deleteProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.clean',
				this.actions.cleanExtensionsHeapCommand,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.rescan',
				this.actions.rescanCommand,
				this.actions,
			),
		);
	}
}
