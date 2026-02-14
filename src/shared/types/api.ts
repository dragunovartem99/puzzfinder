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

export type RangePayload = {
	min?: number;
	max?: number;
	equals?: number;
};

export type SearchFiltersPayload = {
	rating: RangePayload;
	movesNumber: RangePayload;
	popularity: RangePayload;
	nbPlays: RangePayload;
	themes: string[];
};

export type SearchPayload = {
	filters: SearchFiltersPayload;
	sort: {
		field: string;
		order: string;
	};
	pagination: Pick<PaginationResponse, "page" | "limit">;
};
