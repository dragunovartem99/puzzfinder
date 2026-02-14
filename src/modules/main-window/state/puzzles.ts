import type { ApiPuzzle } from "@/shared/types";

import { computed, readonly, ref } from "vue";

type Puzzle = Omit<ApiPuzzle, "themes"> & { themes: string };

const apiPuzzles = ref<ApiPuzzle[]>([]);

const isLoading = ref(false);

const puzzles = computed<Puzzle[]>(() => {
	return apiPuzzles.value.map((apiPuzzle) => ({
		...apiPuzzle,
		themes: apiPuzzle.themes.join(", "),
	}));
});

function setApiPuzzles(puzzles: ApiPuzzle[]): void {
	apiPuzzles.value = puzzles;
}

function setIsLoading(value: boolean): void {
	isLoading.value = value;
}

export function usePuzzles() {
	return {
		puzzles: readonly(puzzles),
		isLoading: readonly(isLoading),
		setApiPuzzles,
		setIsLoading,
	};
}
