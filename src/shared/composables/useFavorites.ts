import { ref, watch } from "vue";

import type { UI } from "../types";

const STORAGE_KEY = "puzzfinder:favorites";

function load(): UI.Puzzle[] {
	try {
		const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

const favorites = ref<UI.Puzzle[]>(load());

watch(
	favorites,
	(value) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		} catch {
			// Storage is unavailable or full: favorites stay in memory for this session
		}
	},
	{ deep: true }
);

export function useFavorites() {
	const has = (id: UI.Puzzle["id"]) => favorites.value.some((puzzle) => puzzle.id === id);

	const remove = (id: UI.Puzzle["id"]) => {
		favorites.value = favorites.value.filter((puzzle) => puzzle.id !== id);
	};

	const toggle = (puzzle: UI.Puzzle) => {
		if (has(puzzle.id)) remove(puzzle.id);
		else favorites.value.push(puzzle);
	};

	const clear = () => {
		favorites.value = [];
	};

	return { favorites, has, toggle, remove, clear };
}
