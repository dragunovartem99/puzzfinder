import type { NumberRange } from "../../shared/types";

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

export type SearchPayload = {
	filters: {
		rating: Partial<NumberRange>;
		movesNumber: Partial<NumberRange>;
		popularity: Partial<NumberRange>;
		nbPlays: Partial<NumberRange>;
		themes: string[];
	};
	sort: {
		field: string;
		order: string;
	};
	pagination: {
		page: number;
		limit: number;
	};
};
