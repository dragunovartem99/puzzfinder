import type { SearchPayload } from "../types";

import { findPuzzles } from "../api/findPuzzles";

import { search } from "../state/form";
import { pagination, setPagination } from "../state/pagination";
import { setIsLoading, setResults } from "../state/results";

export async function submitSearchForm(): Promise<void> {
	const body: SearchPayload = createSearchPayload();

	try {
		setIsLoading(true);
		const { data: puzzles, pagination } = await findPuzzles(body);
		setResults(puzzles);
		setPagination(pagination);
	} catch (e) {
		console.error(e);
		setResults([]);
	} finally {
		setIsLoading(false);
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
