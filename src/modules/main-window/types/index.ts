import type { ApiRange, ApiPagination } from "@/shared/types";

type Filters = {
	rating: Partial<ApiRange>;
	movesNumber: Partial<ApiRange>;
	popularity: Partial<ApiRange>;
	nbPlays: Partial<ApiRange>;
	themes: string[];
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
	filters: Filters;
	sort: SortOption;
};

export type SearchPayload = {
	filters: Filters;
	sort: {
		field: string;
		order: string;
	};
	pagination: Pick<ApiPagination, "page" | "limit">;
};
