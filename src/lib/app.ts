import Errors, { ErrorHandlers } from './errors';
import { ExtensionContext, commands, extensions } from 'vscode';

import Actions from './actions';
import ConfigMaker from './cfg';
import Entry from './entry';
import MapDictionary from './mapDictionary';
import { ProfilesDictionary } from './types';
import ProfilesRepository from './profilesRepository';
import Status from './status';
import User from './user';
import Utils from './utils';
import VpEvents from './events';
import VpExtensions from './extensions';
import VpFileSystem from './fileSystem';
import VpOutputChannel from './outputChannel';
import VpPaths from './paths';
import pkg from '../../package.json';
import settingsCycle from './settingsCycle';
import SettingsCycle from './settingsCycle';

export default class App {
	public actions!: Actions;
	private events!: VpEvents;

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
		await this.actions.rescanCommand();
		// 🕮 <cyberbiont> df6f9de4-57b5-4aa6-8dc6-a7ba9a2c9be4.md
		this.resolveAppInit();
	}

	async compose() {
		const utils = new Utils();
		const outputChannel = new VpOutputChannel(utils, pkg.name);
		const on = new ErrorHandlers();
		const errors = new Errors(outputChannel);
		const cfg = new ConfigMaker().create();
		const status = new Status(utils, `${pkg.name}.switch`);
		const p = new VpPaths(cfg);
		const vpExtensions = new VpExtensions();
		const fs = new VpFileSystem(cfg, errors);
		const link = new Entry(cfg, fs, p, on, errors, vpExtensions);
		const map: ProfilesDictionary = new MapDictionary();
		const profiles = new ProfilesRepository(
			cfg,
			map,
			fs,
			p,
			errors,
			status,
			link,
			outputChannel,
			vpExtensions,
		);
		const settingsCycle = new SettingsCycle(profiles, fs, p, cfg);
		const userInteractions = new User(utils, profiles, errors, cfg);
		const actions = new Actions(
			cfg,
			userInteractions,
			link,
			p,
			profiles,
			on,
			errors,
			status,
			settingsCycle,
		);
		const events = new VpEvents(profiles);
		this.actions = actions;
		this.events = events;
	}

	setEventListeners() {
		extensions.onDidChange(this.events.onExtensionsChange);
	}

	registerCommands(): number {
		return this.context.subscriptions.push(
			commands.registerCommand(
				`vscode-profiles.switch`,
				this.actions.switchProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				`vscode-profiles.create`,
				this.actions.createProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				`vscode-profiles.clone`,
				this.actions.cloneProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				`vscode-profiles.rename`,
				this.actions.renameProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				`vscode-profiles.delete`,
				this.actions.deleteProfileCommand,
				this.actions,
			),
			commands.registerCommand(
				`vscode-profiles.clean`,
				this.actions.cleanCommand,
				this.actions,
			),
			commands.registerCommand(
				`vscode-profiles.rescan`,
				this.actions.rescanCommand,
				this.actions,
			),
			commands.registerCommand(
				`vscode-profiles.maintenance`,
				this.actions.maintenanceCommand,
				this.actions,
			),
		);
	}
	// activation events 🕮 <cyberbiont> 7b5ea811-b28e-47e1-a9b0-e26618330a99.md
}
