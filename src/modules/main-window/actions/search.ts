import type { SearchForm, SearchPayload } from "../types";

import { findPuzzles } from "../api/findPuzzles.ts";

import { useSearchForm, usePagination, usePuzzles } from "../state";

const { searchForm, setSearchForm } = useSearchForm();
const { setApiPuzzles, setIsLoading } = usePuzzles();
const { pagination, setApiPagination } = usePagination();

function createSearchPayload() {
	const { sort, filters } = searchForm.value;
	const [sortField, sortOrder] = sort.split("-");

	return {
		filters: {
			rating: { ...filters.rating },
			movesNumber: { ...filters.movesNumber },
			popularity: { ...filters.popularity },
			nbPlays: { ...filters.nbPlays },
			themes: [...filters.themes],
		},
		sort: { field: sortField, order: sortOrder },
		pagination: { ...pagination.value },
	};
}

export async function submitForm(newSearchForm: SearchForm) {
	setSearchForm(newSearchForm);

	const payload = createSearchPayload();
	payload.pagination.page = 1;

	findResults(payload);
}

export async function changePage(newPage: number) {
	const payload = createSearchPayload();
	payload.pagination.page = newPage;

	findResults(payload);
}

async function findResults(payload: SearchPayload) {
	try {
		setIsLoading(true);

		const { data: puzzles, pagination } = await findPuzzles(payload);

		setApiPuzzles(puzzles);
		setApiPagination(pagination);
	} catch (e) {
		console.error(e);
	} finally {
		setIsLoading(false);
	}
}
