import { httpRequest, type API } from "@/shared";
import { useQuery } from "@tanstack/vue-query";
import { type Ref } from "vue";

type Response = {
	data: API.Puzzle[];
	pagination: API.Pagination;
};

export function queryPuzzles(search: Ref<Partial<API.Search>>) {
	const queryKey = ["puzzles", search];

	return useQuery({
		queryKey,
		queryFn: () => {
			return httpRequest<Response>({
				method: "POST",
				endpoint: "/puzzles/search",
				payload: search.value,
			});
		},
	});
}
