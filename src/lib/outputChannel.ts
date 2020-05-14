import { OutputChannel, window } from "vscode";

import Utils from "./utils";

export default class VpOutputChannel {
	public channel: OutputChannel;
	constructor(private utils: Utils, public name: string) {
		this.channel = window.createOutputChannel(this.utils.capitalize(name));
		this.appendLine(`vscode-profiles started`);
	}

	appendLine(line: string) {
		return this.channel.appendLine(line);
	}
}
