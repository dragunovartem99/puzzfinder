export type ApiPuzzle = {
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

export type ApiPagination = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

