import type { SearchPayload, RangeFilter, RangePayload } from "@/shared/types";

type FormFilters = {
	[K in keyof SearchPayload["filters"]]: SearchPayload["filters"][K] extends RangePayload
		? RangeFilter
		: SearchPayload["filters"][K];
};

export type SortOption =
	| "rating-desc"
	| "rating-asc"
	| "movesNumber-desc"
	| "movesNumber-asc"
	| "popularity-desc"
	| "popularity-asc"
	| "nbPlays-desc"
	| "nbPlays-asc"
	| "puzzleId-desc"
	| "puzzleId-asc";

export type SearchForm = {
	filters: FormFilters;
	sort: SortOption;
};
