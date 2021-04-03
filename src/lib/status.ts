import { StatusBarAlignment, StatusBarItem, window } from 'vscode';

import Utils from './utils';

export default class Status {
	private item: StatusBarItem;
	constructor(private utils: Utils, public command: string) {
		this.item = window.createStatusBarItem(StatusBarAlignment.Left, 100);
		this.item.command = this.command;
	}

	update(text: string, color?: string) {
		this.item.text = `⚙ ${this.utils.capitalize(text)}`;

		if (color) this.item.color = color;
		return this;
		// TODO 🕮 <cyberbiont> dd3f898a-45c9-412d-a974-9f49a7783d3f.md
	}

	get() {
		return this.item.text;
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
