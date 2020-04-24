/* eslint-disable @typescript-eslint/explicit-function-return-type */

export default class MapDictionary<K, T> {
	list: Map<K, T> = new Map();

	add(key: K, item: T) {
		this.list.set(key, item);
		return this;
	}

	get(key: K) {
		return this.list.get(key);
	}

	delete(key: K) {
		this.list.delete(key);
		return this;
	}

	each(cb: (arg: T) => void) {
		this.list.forEach((prop, key) => {
			cb(prop);
		});
	}

	has(key: K): boolean {
		return this.list.has(key);
	}

	clear() {
		this.list.clear();
		return this;
	}

	count(): number {
		return this.list.size;
	}

	*[Symbol.iterator](): Generator<T> {
		for (const item of this.list.values()) {
			yield item;
		}
	}
}
