import { unref, type DeepReadonly, type MaybeRef } from "vue";
import type { SearchForm } from "../types";
import type { PaginationResponse, RangeFilter, RangePayload, SearchPayload } from "@/shared/types";

type Params = {
	searchForm: MaybeRef<SearchForm> | DeepReadonly<MaybeRef<SearchForm>>;
	pagination: MaybeRef<PaginationResponse>;
};

function cleanRange(range: RangeFilter): RangePayload {
	return Object.fromEntries(Object.entries(range).filter(([, value]) => value !== ""));
}

export function createSearchPayload(params: Params): SearchPayload {
	const { sort, filters } = unref(params.searchForm);
	const [sortField, sortOrder] = sort.split("-");

	return {
		filters: {
			rating: cleanRange(filters.rating),
			movesNumber: cleanRange(filters.movesNumber),
			popularity: cleanRange(filters.popularity),
			nbPlays: cleanRange(filters.nbPlays),
			themes: [...filters.themes],
		},
		sort: { field: sortField, order: sortOrder },
		pagination: { ...unref(params.pagination) },
	};
}
