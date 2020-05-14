import { extensions } from "vscode";

export default class VpExtensions {
	listExtensions() {
		// extensions.all.forEach(callbackfn)
	}

	// doExtensionMaintenance(subfolderInfo: Dirent, profileFolderName: string) {
	// 	return this.link.doMaintenance(subfolderInfo, profileFolderName);
	// }

	get(id: string) {
		return extensions.getExtension(id);
		// !в общем, не получается почему-то вытащить кастомное расширение...
		// хотя с 'vscode.git' например работает. может только для встроенных?
	}
}
