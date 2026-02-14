import type { PuzzleResponse } from "@/shared/types";

import { computed, readonly, ref } from "vue";

type Puzzle = Omit<PuzzleResponse, "themes"> & { themes: string };

const response = ref<PuzzleResponse[]>([]);
const isLoading = ref(false);

const puzzles = computed<Puzzle[]>(() =>
	response.value.map((apiPuzzle) => ({
		...apiPuzzle,
		themes: apiPuzzle.themes.join(", "),
	}))
);

function setPuzzles(value: PuzzleResponse[]) {
	response.value = value;
}

function setIsLoading(value: boolean) {
	isLoading.value = value;
}

export function usePuzzles() {
	return {
		puzzles: readonly(puzzles),
		isLoading: readonly(isLoading),
		setPuzzles,
		setIsLoading,
	};
}
