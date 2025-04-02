import { search } from "../state/search";
import { pagination } from "../state/pagination";
import { results } from "../state/results";

import { createSearchBody } from "../utils/createSearchBody";
import { findPuzzles } from "../api/findPuzzles";

export async function sumbitSearchForm() {
	const body = createSearchBody({
		search: search.value,
		pagination: pagination.value,
	});

	const response = await findPuzzles(body);
	results.value = response.data;
	pagination.value = response.pagination;
}
