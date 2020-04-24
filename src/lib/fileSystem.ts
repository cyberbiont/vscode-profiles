import { workspace, Uri } from 'vscode';
import nodeFs from 'fs';
import npath from 'path';
import VpPaths from './paths';
import Errors from './errors';
import { promises } from 'dns';

export type OVpFileSystem = {};
export default class VpFileSystem {
	constructor(
		private cfg: OVpFileSystem,
		private paths: VpPaths,
		private errors: ReturnType<typeof Errors>,
		private fs = workspace.fs,
		public nfs = nodeFs,
	) {}

	rename(source: Uri, target: Uri) {
		return this.fs.rename(source, target, { overwrite: true });
		// .then(undefined, (error) => {
		// 	// 🕮 <cyberbiont> 214f5bb7-b6dc-4ff6-b9f5-3d0142e9addd.md
		// 	if (error.code === 'FileExists') {
		// 		return Promise.resolve();
		// 	} else throw error;
		// });
	}

	readDirectory(folder: Uri) {
		// return this.nfs.promises.readdir(folder, { withFileTypes: true });
		return this.fs.readDirectory(folder);
	}

	createDirectory(folder: Uri) {
		return this.fs.createDirectory(folder);
	}

	copy(src: Uri, dest: Uri) {
		return this.fs.copy(src, dest, {
			overwrite: false,
		});
		// return this.nfs.promises.copyFile(src, dest);

		// 🕮 <cyberbiont> 33210c89-b69a-40a1-9b5e-7cea25bf1b15.md
	}

	// nodeCopy(src, dest) {
	// 	return this.nfs.promises.copyFile(src, dest);
	// }

	symlinkDelete(location: string) {
		return this.nfs.promises.unlink(location);
		// 🕮 <cyberbiont> 528c6ebe-64da-4a29-88c7-574b92ba5d1e.md
	}

	symlinkCreate(shouldPointTo: string, location: string) {
		let type = process.platform === 'win32' ? 'junction' : 'dir';
		return this.nfs.promises.symlink(shouldPointTo, location, type);
		// 🕮 <cyberbiont> 13748a26-b142-4e10-b218-e8954eecd6e1.md
	}

	async symlinkCopy(src: string, dest: string) {
		const linkValue = await this.readSymlink(src);
		return this.symlinkCreate(linkValue, dest);
	}

	delete(folder: Uri) {
		return this.fs.delete(folder, {
			recursive: true,
			useTrash: true,
		});
	}

	async readSymlink(location: string) {
		return this.nfs.promises.readlink(location);
	}

	async switchSymlink(shouldPointTo: string, location: string) {
		return this.readSymlink(location).then(
			async (linkValue) => {
				// const realPath = await this.nfs.promises.realpath(linkValue);
				const posixCurrentlyPointsTo = this.convertToPosix(linkValue);
				// 🕮 <cyberbiont> 4e1c4e69-1d88-4cfd-b71d-444bda8585a1.md
				if (posixCurrentlyPointsTo !== shouldPointTo) {
					console.info(`pointing symlink to ${shouldPointTo}`);
					await this.symlinkDelete(location);
					await this.symlinkCreate(shouldPointTo, location);
				} else {
					console.log(
						`symlink already points to ${shouldPointTo}, doing nothing`,
					);
				}
			},
			async (error) => {
				if (error.code === 'ENOENT') {
					console.warn(
						`no symlink found in themes folder; creating symlink to ${shouldPointTo}`,
					);
					await this.symlinkCreate(shouldPointTo, location);
					// return target;
				} else if (error.code === 'EEXIST') {
					// на всяки слцча выведем здесь оповещение, но ошибку пробросим дальше
					// проверяем, а симлинк ли у нас присутствует или это обычная папка
					const isLink = this.isSymbolicLink(location);
					console.error(
						`error code UNKNOWN, probably not-symbolic dir is present. Is it symbolic link: ${isLink} `,
					);
					throw error;
					// 🕮 <cyberbiont> 370b3694-314d-4453-8acf-32deb5c30755.md
				} else {
					// пробрасываем ошибку в промис
					throw error;
				}
			},
		);
	}

	private convertToPosix(path: string) {
		return path.split(npath.sep).join('/');
	}

	private isSymbolicLink(path: string) {
		return this.nfs.lstatSync(path).isSymbolicLink();
	}
}
