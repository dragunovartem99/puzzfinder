import type { PaginationResponse } from "@/shared/types";

export type NumberRange = {
	min: number;
	max: number;
	equals: number;
};

type Filters = {
	rating: Partial<NumberRange>;
	movesNumber: Partial<NumberRange>;
	popularity: Partial<NumberRange>;
	nbPlays: Partial<NumberRange>;
	themes: string[];
};

export type SortString =
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

export type Search = {
	filters: Filters;
	sort: SortString;
};

export type SearchPayload = {
	filters: Filters;
	sort: {
		field: string;
		order: string;
	};
	pagination: Pick<PaginationResponse, "page" | "limit">;
};
