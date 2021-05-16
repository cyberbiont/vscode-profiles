declare type Optional<T> = T | undefined;

declare type AnyObject = Record<string, unknown>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Constructor<T = AnyObject> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type AnyFunction<T = any> = (...input: any[]) => T;

declare type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

declare type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };
