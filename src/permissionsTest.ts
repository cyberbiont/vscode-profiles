import * as fs from 'fs';

fs.promises
	.access('C:\\test', fs.constants.F_OK)
	.catch((e: Error) => {
		console.log(e);
	})
	.finally(() => console.log('OK'));
