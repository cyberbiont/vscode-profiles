export default class Utils {
	capitalize(str: string) {
		return str.replace(/^\w/, (c) => c.toUpperCase());
	}
}
