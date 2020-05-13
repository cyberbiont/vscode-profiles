import { extensions as vscodeExtensions } from "vscode";
import { Dirent } from "fs";
import Link from "./link";

export default class VpExtensions {
	constructor(public extensions: typeof vscodeExtensions) {}

	listExtensions() {
		// extensions.all.forEach(callbackfn)
	}

	// doExtensionMaintenance(subfolderInfo: Dirent, profileFolderName: string) {
	// 	return this.link.doMaintenance(subfolderInfo, profileFolderName);
	// }

	get(name: string) {
		// return extensions.get();
	}
}
