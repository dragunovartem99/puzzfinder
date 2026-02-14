import type { Pagination, Puzzle, SearchPayload } from "../types";
import { apiRequest } from "@/shared/utils/apiRequest";

type ReturnValue = {
	data: Puzzle[];
	pagination: Pagination;
};

export async function findPuzzles(body: SearchPayload): Promise<ReturnValue> {
	const puzzles = await apiRequest<ReturnValue>({
		method: "POST",
		path: "/puzzles/search",
		payload: body,
	});

	return puzzles;
}
