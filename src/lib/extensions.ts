import { extensions } from 'vscode';

export default class VpExtensions {
	listExtensions() {
		// extensions.all.forEach(callbackfn)
	}

	// 🕮 <cyberbiont> 3bec4a43-e479-4af6-af5d-843573347e27.md

	get(id: string) {
		return extensions.getExtension(id);
		// 🕮 <cyberbiont> 04bc080a-8220-490b-8940-cec02440a49f.md
	}
}
