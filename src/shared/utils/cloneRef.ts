import type { Ref } from "vue";
import { ref, unref } from "vue";

export function cloneRef<T>(input: Ref<T>): Ref<T> {
	const value = JSON.parse(JSON.stringify(unref(input)));
	return ref(value);
}
