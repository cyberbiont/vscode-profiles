import { commands, extensions } from 'vscode';

export default class VpExtensions {
	// listExtensions() {
	// 	// extensions.all.forEach(callbackfn)
	// }

	// 🕮 <cyberbiont> 3bec4a43-e479-4af6-af5d-843573347e27.md

	get(id: string) {
		return extensions.getExtension(id);
		// 🕮 <cyberbiont> 04bc080a-8220-490b-8940-cec02440a49f.md
	}

	// ? 🕮 <cyberbiont> c8db558d-c628-4987-a407-5c55453baf50.md
	public getExtensionId(extensionFolderName: string) {
		// 🕮 <cyberbiont> a71fb4bc-353f-4e76-9dc2-aa967c33b8df.md
		return extensionFolderName.slice(0, extensionFolderName.lastIndexOf(`-`));
	}

	public async installExtension(id: string) {
		return commands.executeCommand('workbench.extensions.installExtension', id);
	}

	public async uninstallExtension(id: string) {
		return commands.executeCommand('workbench.extensions.uninstallExtension', id);
	}
}
