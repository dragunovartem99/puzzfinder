import type { SearchForm } from "../types";
import type { SearchPayload } from "@/shared/types/api.ts";

import { findPuzzles } from "../api/findPuzzles.ts";

import { useSearchForm, usePagination, usePuzzles } from "../state";
import { createSearchPayload } from "./createSearchPayload.ts";

const { searchForm, setSearchForm } = useSearchForm();
const { setPuzzles, setIsLoading } = usePuzzles();
const { pagination, setPagination } = usePagination();

async function findResults(payload: SearchPayload) {
	try {
		setIsLoading(true);

		const { data: puzzles, pagination } = await findPuzzles(payload);

		setPuzzles(puzzles);
		setPagination(pagination);
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
