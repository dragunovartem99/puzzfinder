import type { Pagination, Puzzle, SearchPayload } from "../types";
import { httpRequest } from "@/shared/utils/httpRequest";

type ReturnValue = {
	data: Puzzle[];
	pagination: Pagination;
};

export async function findPuzzles(body: SearchPayload): Promise<ReturnValue> {
	const puzzles = await httpRequest<ReturnValue>({
		url: "https://puzzfinder.99x.space/api/puzzles/search",
		method: "POST",
		payload: body,
	});

	return puzzles;
}
