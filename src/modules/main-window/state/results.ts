import { computed, ref } from "vue";
import type { Puzzle } from "../types";

const privateState = ref<Puzzle[]>([]);

export function setPuzzles(puzzles: Puzzle[]): void {
	privateState.value = puzzles;
}

export const results = computed(() => privateState.value);
