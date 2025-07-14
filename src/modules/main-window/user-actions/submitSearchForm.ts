import type { SearchPayload } from "../types";

import { findPuzzles } from "../api/findPuzzles";

import { search } from "../state/search";
import { pagination } from "../state/pagination";
import { results } from "../state/results";

export async function submitSearchForm() {
	const body: SearchPayload = createSearchPayload();

	try {
		const response = await findPuzzles(body);
		results.value = response.data;
		pagination.value = response.pagination;
	} catch (e) {
		console.error((e as Error).toString());
	}
}

function createSearchPayload(): SearchPayload {
	const [sortField, sortOrder] = search.value.sort.split("-");

	const payload: SearchPayload = {
		...search.value,
		sort: { field: sortField, order: sortOrder },
		pagination: pagination.value,
	};

	return payload;
}
