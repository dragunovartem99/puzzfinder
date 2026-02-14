import type { ApiPagination } from "@/shared/types";

import { ref, readonly } from "vue";

const pagination = ref<ApiPagination>({
	page: 1,
	limit: 24,
	total: 0,
	totalPages: 0,
});

function setPagination(newPagination: ApiPagination) {
	pagination.value = newPagination;
}

export function usePagination() {
	return {
		pagination: readonly(pagination),
		setPagination,
	};
}
