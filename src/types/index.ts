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

export type NumberRange = {
	min: number;
	max: number;
	equals: number;
};

export type SearchPayload = {
	filters: {
		rating: NumberRange;
		movesNumber: NumberRange;
		popularity: NumberRange;
		nbPlays: NumberRange;
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
