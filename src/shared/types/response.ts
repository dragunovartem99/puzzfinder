export type PuzzleResponse = {
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

export type PaginationResponse = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};
