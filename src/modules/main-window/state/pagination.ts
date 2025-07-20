import type { Pagination } from "../types";

import { ref, readonly } from "vue";

const pagination = ref<Pagination>({
	page: 1,
	limit: 24,
	total: 0,
	totalPages: 0,
});

function setPagination(newPagination: Pagination) {
	pagination.value = newPagination;
}

export function usePagination() {
	return {
		pagination: readonly(pagination),
		setPagination,
	};
}
