export type Puzzle = {
	fen: string;
	gameUrl: string;
	moves: string;
	movesNumber: number;
	nbPlays: number;
	openingTags: string;
	popularity: number;
	puzzleId: string;
	rating: number;
	ratingDeviation: number;
	themes: string[];
};

export type Pagination = {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
};

export type Search = {
	sort: {
		field: string;
		order: string;
	};
};
