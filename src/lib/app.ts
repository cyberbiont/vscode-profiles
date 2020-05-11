import { commands, ExtensionContext } from "vscode";
import ConfigMaker from "./cfg";
import Actions from "./actions";
import ProfilesRepository from "./profilesRepository";
import User from "./user";
import VpPaths from "./paths";
import VpFileSystem from "./fileSystem";
import MapDictionary from "./mapDictionary";
import { ProfilesDictionary } from "./types";
import { errorsLibrary, errorHandlers } from "./errors";
import Link from "./link";
import Status from "./status";
import pkg from "../../package.json";
import VpOutputChannel from "./outputChannel";
import Utils from "./utils";

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
		const outChannel = new VpOutputChannel(utils, pkg.name);
		const errors = errorsLibrary();
		const on = errorHandlers();
		const cfg = new ConfigMaker().create();
		const status = new Status(utils, `${pkg.name}.switch`);
		const p = new VpPaths(cfg);
		const fs = new VpFileSystem(cfg, errors);
		const link = new Link(cfg, fs, p, on, errors);
		const map: ProfilesDictionary = new MapDictionary();
		const profiles = new ProfilesRepository(cfg, map, fs, p, errors, status);
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
				`vscode-profiles.symlinkify`,
				this.actions.symlinkifyCurrentProfile,
				this.actions,
			),
		);
	}
	// activation events 🕮 <cyberbiont> 7b5ea811-b28e-47e1-a9b0-e26618330a99.md
}
