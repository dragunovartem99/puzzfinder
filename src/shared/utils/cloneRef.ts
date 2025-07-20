import type { Ref } from "vue";
import { ref } from "vue";

export function cloneRef<T>(input: Ref<T>): Ref<T> {
	return ref(JSON.parse(JSON.stringify(input.value)));
}
