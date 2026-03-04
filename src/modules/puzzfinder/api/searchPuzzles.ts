import { httpRequest, type API } from "@/shared";

type Response = {
	data: API.Puzzle[],
	pagination: API.Pagination;
};

export async function searchPuzzles(search: API.Search) {
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
