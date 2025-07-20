import type { Puzzle } from "../types";

import { readonly, ref } from "vue";

const results = ref<Puzzle[]>([]);
const isLoading = ref(false);

function setResults(puzzles: Puzzle[]): void {
	results.value = puzzles;
}

function setIsLoading(value: boolean): void {
	isLoading.value = value;
}

export function useResults() {
	return {
		results: readonly(results),
		isLoading: readonly(isLoading),
		setResults,
		setIsLoading,
	};
}
