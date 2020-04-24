type ErrorsLibrary = {
	[name: string]: Constructor<Error>;
};

type ErrorHandlers = {
	[name: string]: (error: Error) => any;
};

export function errorHandlers(): ErrorHandlers {
	async function error(error: Error) {
		console.log(error);
		return Promise.resolve();
	}

	return {
		error,
	};
}

export default function errorsLibrary(): ErrorsLibrary {
	class VpError extends Error {
		readonly name = this.constructor.name;
		constructor(message: string) {
			super(message);
		}
	}

	class InteractionError extends VpError {
		constructor(public message = '') {
			super(`User hasn't provided input. ${message ? message : ''}`);
		}
	}

	// class FileSystemError extends VpError {
	// 	constructor(message = '') {
	// 		super(`File already exists. ${message}`);
	// 	}
	// }

	return {
		VpError,
		InteractionError,
	};
}
