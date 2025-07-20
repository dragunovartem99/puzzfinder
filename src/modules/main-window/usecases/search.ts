import type { Search, SearchPayload } from "../types";

import { unref, type MaybeRef } from "vue";

import { findPuzzles } from "../api/findPuzzles";

import { pagination, setPagination } from "../state/pagination";
import { setIsLoading, setResults } from "../state/results";

import { useSearch } from "../state/search";

const { search, setSearch } = useSearch();

export async function submitForm(search: MaybeRef<Search>): Promise<void> {
	setSearch(unref(search));

	const body: SearchPayload = createSearchPayload(unref(search));
	body.pagination.page = 1;

	findResults(body);
}

export async function changePage(page: MaybeRef<number>) {
	const body: SearchPayload = createSearchPayload(unref(search));
	body.pagination.page = unref(page);

	findResults(body);
}

async function findResults(body: SearchPayload) {
	try {
		setIsLoading(true);

		const { data: puzzles, pagination } = await findPuzzles(body);
		setResults(puzzles);
		setPagination(pagination);
	} catch (e) {
		console.error(e);
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
