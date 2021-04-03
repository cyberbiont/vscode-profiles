import { FileSystemError } from 'vscode';
import VpOutputChannel from './outputChannel';

// 🕮 <cyberbiont> f175e603-9464-4bba-b55f-9a632dce8b1e.md
export class ErrorHandlers {
	async error(err: Error) {
		console.log(err);
		// throw new Error();
	}

	async cancel(err: Error) {
		console.log(err);
		throw err;
	}

	async resume(err: Error) {
		// log and continue
		console.log(err);
	}
}

export default class Errors {
	constructor(public channel: VpOutputChannel) {}

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
			super(`${description} ${message}`);
			this.rootThis.channel.appendLine(`${description} ${message}`);
		}
	}.bind(null, this);

	public SwapperSymlinkError = class SwapperSymlinkError extends this.VpError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `It seems that thare's a problem with "extensions" symlink`,
		) {
			super(`${description} ${message}`);
			this.rootThis.channel.appendLine(`${description} ${message}`);
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
			super(`${description} ${message}`);
			this.rootThis.channel.appendLine(`${description} ${message}`);
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
			super(`${description} ${message}`);
			this.rootThis.channel.appendLine(`${description} ${message}`);
		}
	}.bind(null, this);

	public IsDirectory = class IsDirectoryError extends this.SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `It seems that there is a normal directory in place of "extensions" symlink.`,
		) {
			super(`${description} ${message}`);
			this.rootThis.channel.appendLine(`${description} ${message}`);
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
			super(`${description} ${message}`);
			this.rootThis.channel.appendLine(`${description} ${message}`);
		}
	}.bind(null, this);

	public MissingProfileFolder = class MissingProfileFolderError extends FileSystemError {
		readonly name = this.constructor.name;
		constructor(
			public rootThis: Errors,
			public message = ``,
			public description = `Profile folder was not found.`,
		) {
			super(`${description} ${message}`);
			this.rootThis.channel.appendLine(`${description} ${message}`);
		}
	}.bind(null, this);
}

// 🕮 <cyberbiont> 90b91af8-0eb6-45bc-b665-fbff110cb2bc.md
