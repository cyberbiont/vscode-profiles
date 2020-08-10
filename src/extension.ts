import vscode from 'vscode';
import App from './lib/app';

export function activate(context: vscode.ExtensionContext) {
	return new Promise(resolveAppInit => {
		const app = new App(context, resolveAppInit);
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deactivate(this: any): void {
	this._subscriptions.dispose();
}
