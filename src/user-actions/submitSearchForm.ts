import { search } from "../state/search";
import { pagination } from "../state/pagination";
import { results } from "../state/results";

import { createSearchPayload } from "../utils/createSearchPayload";
import { findPuzzles } from "../api/findPuzzles";

export async function sumbitSearchForm() {
	const body = createSearchPayload({
		...search.value,
		pagination: pagination.value,
	});

	const response = await findPuzzles(body);

	results.value = response.data;
	pagination.value = response.pagination;
}
