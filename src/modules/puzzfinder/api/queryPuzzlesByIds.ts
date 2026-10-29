import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";

import { httpRequest } from "@/shared";
import type { API } from "@/shared";

type Response = { data: API.Puzzle[] };

// The API takes at most this many ids per request
const CHUNK = 100;

function chunks(ids: string[]): string[][] {
	return Array.from({ length: Math.ceil(ids.length / CHUNK) }, (_, index) =>
		ids.slice(index * CHUNK, (index + 1) * CHUNK)
	);
}

export function queryPuzzlesByIds(ids: Ref<string[]>) {
	return useQuery({
		queryKey: ["puzzles", "ids", ids],
		enabled: () => ids.value.length > 0,
		placeholderData: keepPreviousData,
		queryFn: async () => {
			const responses = await Promise.all(
				chunks(ids.value).map((chunk) =>
					httpRequest<Response>({ endpoint: "/puzzles?ids=" + chunk.join(",") })
				)
			);
			return responses.flatMap((response) => response.data);
		},
	});
}
