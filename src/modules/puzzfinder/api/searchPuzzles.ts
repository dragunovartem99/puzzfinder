import { httpRequest, type API } from "@/shared";
import type { DeepPartial } from "@/shared/types";

type Response = {
	data: API.Puzzle[],
	pagination: API.Pagination;
};

export async function searchPuzzles(search: DeepPartial<API.Search>) {
	try {
		const response = await httpRequest<Response>({
			method: "POST",
			endpoint: "/puzzles/search",
			payload: search
		});

		return response;
	} catch (e) {
		console.error(e);
	}
}
