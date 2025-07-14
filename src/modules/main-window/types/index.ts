import type { NumberRange } from "../../shared/types";

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
	pagination: {
		page: number;
		limit: number;
	};
};

export type Puzzle = {
	puzzleId: string;
	fen: string;
	moves: string;
	movesNumber: number;
	rating: number;
	ratingDeviation: number;
	popularity: number;
	nbPlays: number;
	themes: string[];
	gameUrl: string;
	openingTags?: string;
};
