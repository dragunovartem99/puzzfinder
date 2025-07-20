import type { Search, SearchPayload } from "../types";

import { unref, type MaybeRef } from "vue";

import { findPuzzles } from "../api/findPuzzles.ts";

import { pagination, setPagination } from "../state/pagination.ts";
import { setIsLoading, setResults } from "../state/results.ts";

import { useSearch } from "../state/search.ts";

const { search, setSearch } = useSearch();

export async function submitForm(newSearch: MaybeRef<Search>): Promise<void> {
	setSearch(unref(newSearch));

	const payload: SearchPayload = createSearchPayload(unref(search));
	payload.pagination.page = 1;

	findResults(payload);
}

export async function changePage(newPage: MaybeRef<number>) {
	const payload: SearchPayload = createSearchPayload(unref(search));
	payload.pagination.page = unref(newPage);

	findResults(payload);
}

async function findResults(payload: SearchPayload) {
	try {
		setIsLoading(true);

		const { data: puzzles, pagination } = await findPuzzles(payload);
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
