import type { PaginationResponse, PuzzleResponse, SearchPayload } from "@/shared/types";

import { apiRequest } from "@/shared/utils/apiRequest";

type Response = {
	data: PuzzleResponse[];
	pagination: PaginationResponse;
};

export async function findPuzzles(body: SearchPayload) {
	const puzzles = await apiRequest<Response>({
		method: "POST",
		path: "/puzzles/search",
		payload: body,
	});

	return puzzles;
}
