import type { UnwrapRef } from "vue";
import { unref } from "vue";

export type DeepWritable<T> = T extends object
	? { -readonly [P in keyof T]: DeepWritable<T[P]> }
	: T;

export function getRawClone<T>(input: T): DeepWritable<UnwrapRef<T>> {
	const value = JSON.parse(JSON.stringify(unref(input)));
	return value;
}
