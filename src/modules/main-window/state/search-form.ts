import type { SearchForm } from "../types";

import { readonly, ref } from "vue";

const searchForm = ref<SearchForm>({
	filters: {
		rating: {},
		movesNumber: {},
		popularity: {},
		nbPlays: {},
		themes: [],
	},
	sort: "rating-desc",
});

function setSearchForm(newSearchForm: SearchForm) {
	searchForm.value = newSearchForm;
}

export function useSearchForm() {
	return {
		searchForm: readonly(searchForm),
		setSearchForm,
	};
}
