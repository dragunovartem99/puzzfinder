import { computed, reactive } from "vue";
import type { Puzzle } from "../types";

type State = {
	results: Puzzle[];
	isLoading: boolean;
};

const privateState: State = reactive({
	results: [],
	isLoading: false,
});

export function setResults(puzzles: Puzzle[]): void {
	privateState.results = puzzles;
}

export function setIsLoading(state: boolean): void {
	privateState.isLoading = state;
}

export const results = computed(() => privateState.results);
export const isLoading = computed(() => privateState.isLoading);
