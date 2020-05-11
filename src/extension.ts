import vscode from "vscode";
import App from "./lib/app";

export function activate(context: vscode.ExtensionContext) {
	return new Promise((resolveAppInit) => {
		const app = new App(context, resolveAppInit);
	});
}

export function deactivate(): void {
	this._subscriptions.dispose();
}
