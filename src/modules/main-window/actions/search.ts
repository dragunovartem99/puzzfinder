import type { SearchForm, SearchPayload } from "../types";

import { findPuzzles } from "../api/findPuzzles.ts";

import { useSearchForm, usePagination, usePuzzles } from "../state";
import { createSearchPayload } from "./createSearchPayload.ts";

const { searchForm, setSearchForm } = useSearchForm();
const { setApiPuzzles, setIsLoading } = usePuzzles();
const { pagination, setApiPagination } = usePagination();

async function findResults(payload: SearchPayload) {
	try {
		setIsLoading(true);

		const { data, pagination } = await findPuzzles(payload);

		setApiPuzzles(data);
		setApiPagination(pagination);
	} catch (e) {
		console.error(e);
	} finally {
		setIsLoading(false);
	}
}

export async function submitForm(newSearchForm: SearchForm) {
	setSearchForm(newSearchForm);

	const payload = createSearchPayload({ searchForm, pagination });
	payload.pagination.page = 1;

	findResults(payload);
}

export async function changePage(newPage: number) {
	const payload = createSearchPayload({ searchForm, pagination });
	payload.pagination.page = newPage;

	findResults(payload);
}
