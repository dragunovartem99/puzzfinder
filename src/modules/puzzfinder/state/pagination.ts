import { ref } from "vue";
import { type API } from "@/shared";

const state = ref<API.Pagination | null>(null);

export function usePagination() {
	function setState(newState: API.Pagination) {
		state.value = newState;
	}

	return {
		state,
		setState,
	};
}
