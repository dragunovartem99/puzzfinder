import type { Search } from "../types";

import { ref } from "vue";

const privateState = ref<Search>({
	filters: {
		rating: {},
		movesNumber: {},
		popularity: {},
		nbPlays: {},
		themes: [],
	},
	sort: "rating-desc",
});

function setSearch(search: Search): void {
	privateState.value = search;
}

export function useSearch() {
	return {
		search: privateState,
		setSearch,
	};
}
