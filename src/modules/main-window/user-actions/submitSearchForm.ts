import type { SearchPayload } from "../types";

import { findPuzzles } from "../api/findPuzzles";

import { search } from "../state/search";
import { pagination, setPagination } from "../state/pagination";
import { setPuzzles } from "../state/results";

export async function submitSearchForm(): Promise<void> {
	const body: SearchPayload = createSearchPayload();

	try {
		const { data: puzzles, pagination } = await findPuzzles(body);
		setPuzzles(puzzles);
		setPagination(pagination);
	} catch (e) {
		console.error((e as Error).toString());
	}
}

function createSearchPayload(): SearchPayload {
	const [sortField, sortOrder] = search.value.sort.split("-");

	const payload: SearchPayload = {
		filters: { ...search.value.filters },
		sort: { field: sortField, order: sortOrder },
		pagination: { ...pagination.value },
	};

	return payload;
}
