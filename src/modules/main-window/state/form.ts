import { readonly, ref } from "vue";
import type { Search } from "../types";

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
		search: readonly(privateState),
		setSearch,
	};
}
