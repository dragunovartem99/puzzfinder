import type { ApiPagination, ApiPuzzle } from "@/shared/types";
import type { SearchPayload } from "../types";

import { apiRequest } from "@/shared/utils/apiRequest";

type ApiResponse = {
	data: ApiPuzzle[];
	pagination: ApiPagination;
};

export async function findPuzzles(body: SearchPayload) {
	const puzzles = await apiRequest<ApiResponse>({
		method: "POST",
		path: "/puzzles/search",
		payload: body,
	});

	return puzzles;
}
