import { FileSystemError } from "vscode";

// 🕮 <cyberbiont> f175e603-9464-4bba-b55f-9a632dce8b1e.md

export function errorHandlers() {
	async function error(error: Error) {
		console.log(error);
		// throw new Error();
		// return Promise.resolve();
	}

	async function cancel(error: Error) {
		console.log(error);
		throw error;
	}

	async function resume(error: Error) {
		// log and continue
		console.log(error);
	}

	return {
		error,
		resume,
		cancel,
	};
}

// https://stackoverflow.com/questions/32494174/can-you-create-nested-classes-in-typescript
// export default class Errors {
// 	constructor(private channel: OutputChannel) {}

// 	public VpError = class extends Error {
// 		readonly name = this.constructor.name;
// 		constructor(message: string) {
// 			super(message);
// 		}
// 	};
// }

export function errorsLibrary() {
	// TODO переделать в класс, зависимостью передать output channel
	class VpError extends Error {
		readonly name = this.constructor.name;
		constructor(message: string) {
			super(message);
		}
	}

	class InteractionError extends VpError {
		readonly name = this.constructor.name;
		constructor(public message = "") {
			super(`User hasn't provided input. ${message ? message : ""}`);
		}
	}

	class SwapperSymlinkError extends VpError {
		readonly name = this.constructor.name;
		constructor(public message = "") {
			super(
				`It seems that thare's a problem with "extensions" symlink. ${message}`,
			);
		}
	}

	class BrokenSymlink extends SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(public message = "") {
			super(`It seems that "extensions" symlink is broken. ${message}`);
		}
	}

	class MissingSymlink extends SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(public message = "") {
			super(
				`It seems that "extensions" symlink is missing (or the folder is wrongly named). ${message}`,
			);
		}
	}

	class IsDirectory extends SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(public message = "") {
			super(
				`It seems that there is a normal directory in place of "extensions" symlink. ${message}`,
			);
		}
	}

	class SymlinkExists extends SwapperSymlinkError {
		readonly name = this.constructor.name;
		constructor(public message = "") {
			super(
				`It seems that "extensions" symlink already exists and points to this folder. ${message}`,
			);
		}
	}

	class MissingProfileFolder extends FileSystemError {
		readonly name = this.constructor.name;
		constructor(public message = "") {
			super(`Profile folder was not found. ${message}`);
		}
	}

	return {
		VpError,
		InteractionError,
		SwapperSymlinkError,
		MissingSymlink,
		BrokenSymlink,
		IsDirectory,
		SymlinkExists,
		MissingProfileFolder,
	};
}

// лечение
// console.warn(
// 	`no symlink found in themes folder; creating symlink to ${shouldPointTo}`,
// );
// await this.symlinkCreate(shouldPointTo, location);
// return target;

// console.log(`symlink already points to ${shouldPointTo}, doing nothing`);
