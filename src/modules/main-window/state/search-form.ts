import type { SearchForm } from "../types";

import { readonly, ref } from "vue";

const emptyFilter = () => ({ equals: "", max: "", min: "" }) as const;

const searchForm = ref<SearchForm>({
	filters: {
		rating: emptyFilter(),
		movesNumber: emptyFilter(),
		popularity: emptyFilter(),
		nbPlays: emptyFilter(),
		themes: [],
	},
	sort: "rating-desc",
});

function setSearchForm(value: SearchForm) {
	searchForm.value = value;
}

export function useSearchForm() {
	return {
		searchForm: readonly(searchForm),
		setSearchForm,
	};
}
