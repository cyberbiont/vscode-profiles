import { commands, extensions } from 'vscode';

export default class VpExtensions {
	listExtensions() {
		// extensions.all.forEach(callbackfn)
	}

	// 🕮 <cyberbiont> 3bec4a43-e479-4af6-af5d-843573347e27.md

	get(id: string) {
		return extensions.getExtension(id);
		// 🕮 <cyberbiont> 04bc080a-8220-490b-8940-cec02440a49f.md
	}

	// 🕮 <cyberbiont> c8db558d-c628-4987-a407-5c55453baf50.md
	public getExtensionId(extensionFolderName: string) {
		return extensionFolderName.slice(0, extensionFolderName.lastIndexOf(`-`));
	}

	public isSettingsCyclerExtension(folderName: string) {
		return (
			this.getExtensionId(folderName) === 'hoovercj.vscode-settings-cycler'
		);
	}


}
