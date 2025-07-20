import type { Search, SearchPayload } from "../types";

import { findPuzzles } from "../api/findPuzzles";

import { pagination, setPagination } from "../state/pagination";
import { setIsLoading, setResults } from "../state/results";

export async function submitSearchForm(search: Search): Promise<void> {
	const body: SearchPayload = createSearchPayload(search);

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

function createSearchPayload(search: Search): SearchPayload {
	const [sortField, sortOrder] = search.sort.split("-");

	const payload: SearchPayload = {
		filters: { ...search.filters },
		sort: { field: sortField, order: sortOrder },
		pagination: { ...pagination.value },
	};

	return payload;
}
