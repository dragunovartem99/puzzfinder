import type { PaginationResponse, PuzzleResponse } from "@/shared/types";
import type { SearchPayload } from "../types";

import { apiRequest } from "@/shared/utils/apiRequest";

type Response = {
	data: PuzzleResponse[];
	pagination: PaginationResponse;
};

export async function findPuzzles(body: SearchPayload): Promise<Response> {
	const puzzles = await apiRequest<Response>({
		method: "POST",
		path: "/puzzles/search",
		payload: body,
	});

	return puzzles;
}
