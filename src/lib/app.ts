import { commands, ExtensionContext } from 'vscode';
import { Cfg } from './cfg';
import Actions from './actions';
import ProfilesRepository from './profilesRepository';
import UserInteractions from './userInteractions';
import VpPaths from './paths';
import VpFileSystem from './fileSystem';
import MapDictionary from './mapDictionary';
import { ProfilesDictionary } from './types';
import Errors from './errors';
import { errorHandlers } from './errors';

export default class App {
	public actions: Actions;
	// private events: SnEvents;

	constructor(
		private cfg: Cfg,
		private context: ExtensionContext,
		private resolveAppInit,
	) {
		this.init();
	}

	async init() {
		await this.compose();
		// this.checkRequirements();
		// this.registerProviders();

		this.registerCommands();
		this.setEventListeners();
		await this.actions.rescan();
		this.resolveAppInit();
	}

	async compose() {
		const errors = Errors();
		const on = errorHandlers();
		const paths = new VpPaths();
		const fs = new VpFileSystem(this.cfg, paths, errors);
		const map: ProfilesDictionary = new MapDictionary();
		const pool = new ProfilesRepository(this.cfg, map, paths, fs);
		const userInteractions = new UserInteractions(pool, errors);
		const actions = new Actions(
			this.cfg,
			userInteractions,
			fs,
			paths,
			pool,
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
				this.actions.switchProfile,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.create',
				this.actions.createProfile,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.clone',
				this.actions.cloneProfile,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.rename',
				this.actions.renameProfile,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.delete',
				this.actions.deleteProfile,
				this.actions,
			),
			commands.registerCommand(
				'vscode-profiles.clean',
				this.actions.cleanExtensionsHeap,
				this.actions,
			),
		);
	}
}
