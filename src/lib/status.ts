import { StatusBarAlignment, StatusBarItem, window } from "vscode";

import Utils from "./utils";

export default class Status {
	private item: StatusBarItem;
	constructor(private utils: Utils, public command: string) {
		this.item = window.createStatusBarItem(StatusBarAlignment.Left, 100);
		this.item.command = this.command;
	}

	update(text: string, color?: string) {
		this.item.text = `⚙ ${this.utils.capitalize(text)}`;
		// this.item.text = `⚙ ${text.replace(/^\w/, (c) => c.toUpperCase())}`;
		if (color) this.item.color = color;
		return this;
		// можно еще в tooltip отображать description
	}

	show() {
		this.item.show();
		return this;
	}

	hide() {
		this.item.hide();
		return this;
	}
}
