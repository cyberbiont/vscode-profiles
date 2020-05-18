import { OActions } from "./actions";
import { OLink } from "./link";
import { OPaths } from "./paths";
import os from "os";
import path from "path";
import { workspace } from "vscode";
import { OProfilesRepository } from "./profilesRepository";

const homedir = os.homedir();
const settings = workspace.getConfiguration(`sidenotes`);

export type Cfg = OActions & OLink & OPaths & OProfilesRepository;

export default class ConfigMaker {
	create(): Cfg {
		return {
			extensions: {
				symlinkifyExtensions: settings.get(`symlinkifyExtensions`) || false
			},
			paths: {
				profiles:
					settings.get(`profilesPath`) ||
					path.join(homedir, `.vscode`, `profiles`),
				extensionsStandard: path.join(homedir, `.vscode`, `extensions`),
				extensionsStorage: path.join(homedir, `.vscode`, `extensions.storage`),

				// 🕮 <cyberbiont> a095c6a5-7401-4996-80cf-f9d9bcde283a.md
				// settings sync 🕮 <cyberbiont> 7bb6d843-59e8-48f3-a02d-d0fd28b547ba.md
			},
		};
	}
}
