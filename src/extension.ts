import vscode from 'vscode';
import App from './lib/app';
import cfg from './lib/cfg';

let app: App;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// try {
	return new Promise((resolveAppInit) => {
		app = new App(cfg, context, resolveAppInit);
	});
	// app = new App(cfg, context);
	// } catch (e) {
	// 	console.log(e);
	// }
}

// this method is called when your extension is deactivated
export function deactivate(): void {
	this._subscriptions.dispose();
}
