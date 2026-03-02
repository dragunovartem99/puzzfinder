import { ref } from "vue";
import { type API } from "@/shared";

const state = ref<API.Puzzle[]>([]);

export function usePuzzles() {
	function setState(newState: API.Puzzle[]) {
		state.value = newState;
	}

	return {
		state,
		setState,
	};
}
