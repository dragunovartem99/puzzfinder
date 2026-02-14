import { unref, type DeepReadonly, type MaybeRef } from "vue";
import type { SearchForm, SearchPayload } from "../types";
import type { ApiPagination } from "@/shared/types";

type Params = {
	searchForm: MaybeRef<SearchForm> | DeepReadonly<MaybeRef<SearchForm>>;
	pagination: MaybeRef<ApiPagination>;
};

export function createSearchPayload(params: Params): SearchPayload {
	const { sort, filters } = unref(params.searchForm);
	const [sortField, sortOrder] = sort.split("-");

	return {
		filters: {
			rating: { ...filters.rating },
			movesNumber: { ...filters.movesNumber },
			popularity: { ...filters.popularity },
			nbPlays: { ...filters.nbPlays },
			themes: [...filters.themes],
		},
		sort: { field: sortField, order: sortOrder },
		pagination: { ...unref(params.pagination) },
	};
}
