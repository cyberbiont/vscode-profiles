import { FileSystemError } from "vscode";
import VpOutputChannel from "./outputChannel";

// 🕮 <cyberbiont> f175e603-9464-4bba-b55f-9a632dce8b1e.md
export class ErrorHandlers {
	async error(error: Error) {
		console.log(error);
		// throw new Error();
		// return Promise.resolve();
	}

	async cancel(error: Error) {
		console.log(error);
		throw error;
	}

	async resume(error: Error) {
		// log and continue
		console.log(error);
	}
}

// https://stackoverflow.com/questions/32494174/can-you-create-nested-classes-in-typescript
export default class Errors {
	constructor(public channel: VpOutputChannel) {}
	/* оптимальный вариант, так как классы-методы у нас находятся в прототипе,
	т.е. мы можем создать несколько экземляров Errors с разными зависимостями,
	при этом классы у нас останутся в единичном экземпляре
	*/
	public VpError = class VpError extends Error {
		readonly name = this.constructor.name;
		constructor(public rootThis: Errors, public message: string = ``) {
			super(message);
			this.rootThis.channel.appendLine(message);
		}
	}.bind(null, this);

	public InteractionError = class InteractionError extends this.VpError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `User hasn't provided input.`,
		) {
			super(description + message);
			this.rootThis.channel.appendLine(description + message);
		}
	}.bind(null, this);

	public SwapperSymlinkError = class SwapperSymlinkError extends this.VpError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `It seems that thare's a problem with "extensions" symlink`,
		) {
			super(description + message);
			this.rootThis.channel.appendLine(description + message);
		}
	}.bind(null, this);

	public BrokenSymlink = class BrokenSymlinkError extends this
		.SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `It seems that "extensions" symlink is broken`,
		) {
			super(description + message);
			this.rootThis.channel.appendLine(description + message);
		}
	}.bind(null, this);

	public MissingSymlink = class MissingSymlinkError extends this
		.SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `It seems that "extensions" symlink is missing (or the folder is wrongly named).`,
		) {
			super(description + message);
			this.rootThis.channel.appendLine(description + message);
		}
	}.bind(null, this);

	public IsDirectory = class IsDirectoryError extends this.SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `It seems that there is a normal directory in place of "extensions" symlink.`,
		) {
			super(description + message);
			this.rootThis.channel.appendLine(description + message);
		}
	}.bind(null, this);

	public SymlinkExists = class SymlinkExistsError extends this
		.SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `It seems that "extensions" symlink already exists and points to this folder.`,
		) {
			super(description + message);
			this.rootThis.channel.appendLine(description + message);
		}
	}.bind(null, this);

	public MissingProfileFolder = class MissingProfileFolderError extends FileSystemError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `Profile folder was not found.`,
		) {
			super(description + message);
			this.rootThis.channel.appendLine(description + message);
		}
	}.bind(null, this);
}

// лечение
// console.warn(
// 	`no symlink found in themes folder; creating symlink to ${shouldPointTo}`,
// );
// await this.symlinkCreate(shouldPointTo, location);
// return target;

// console.log(`symlink already points to ${shouldPointTo}, doing nothing`);
