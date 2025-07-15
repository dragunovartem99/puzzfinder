<<<<<<< HEAD
export type NumberRange = {
	min: number;
	max: number;
	equals: number;
};
=======
import type { NumberRange } from "../../shared/types";
>>>>>>> main

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

<<<<<<< HEAD
export type Pagination = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

=======
>>>>>>> main
export type SearchPayload = {
	filters: Filters;
	sort: {
		field: string;
		order: string;
	};
<<<<<<< HEAD
	pagination: Pick<Pagination, "page" | "limit">;
=======
	pagination: {
		page: number;
		limit: number;
	};
>>>>>>> main
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
