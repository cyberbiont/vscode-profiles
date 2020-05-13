import { commands, ExtensionContext, extensions } from "vscode";
import ConfigMaker from "./cfg";
import Actions from "./actions";
import ProfilesRepository from "./profilesRepository";
import User from "./user";
import VpPaths from "./paths";
import VpFileSystem from "./fileSystem";
import MapDictionary from "./mapDictionary";
import { ProfilesDictionary } from "./types";
import Link from "./link";
import Status from "./status";
import pkg from "../../package.json";
import VpOutputChannel from "./outputChannel";
import Utils from "./utils";
import VpExtensions from "./extensions";
import Errors, { ErrorHandlers } from "./errors";

export default class App {
	public actions: Actions;
	// private events: VPEvents;

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
		// this.setEventListeners();
		await this.actions.rescanCommand();
		// 🕮 <cyberbiont> df6f9de4-57b5-4aa6-8dc6-a7ba9a2c9be4.md
		this.resolveAppInit();
	}

	async compose() {
		const utils = new Utils();
		const outputChannel = new VpOutputChannel(utils, pkg.name);
		// const errors = errorsLibrary();
		// const on = errorHandlers();
		const on = new ErrorHandlers();
		const errors = new Errors(outputChannel);
		const cfg = new ConfigMaker().create();
		const status = new Status(utils, `${pkg.name}.switch`);
		const p = new VpPaths(cfg);
		const vpExtensions = new VpExtensions(extensions);
		const fs = new VpFileSystem(cfg, errors);
		const link = new Link(cfg, fs, p, on, errors, vpExtensions);
		const map: ProfilesDictionary = new MapDictionary();
		const profiles = new ProfilesRepository(
			cfg,
			map,
			fs,
			p,
			errors,
			status,
			link,
			vpExtensions,
		);
		const userInteractions = new User(utils, profiles, errors);
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

	// setEventListeners(): void {}

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
				this.actions.clean,
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
