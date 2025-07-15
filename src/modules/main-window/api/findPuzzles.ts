import { httpRequest } from "@/shared/utils/httpRequest";
import type { Puzzle, SearchPayload } from "../types";

type ReturnValue = {
	data: Puzzle[];
	pagination: any;
};

export async function findPuzzles(body: SearchPayload): Promise<ReturnValue> {
	const puzzles = await httpRequest<ReturnValue>({
		url: "https://puzzfinder.99x.space/puzzles",
		method: "POST",
		payload: body,
	});

	return puzzles;
}
