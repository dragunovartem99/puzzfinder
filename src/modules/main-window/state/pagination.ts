import type { ApiPagination } from "@/shared/types";

import { ref, readonly } from "vue";

const pagination = ref<ApiPagination>({
	page: 1,
	limit: 24,
	total: 0,
	totalPages: 0,
});

function setApiPagination(newApiPagination: ApiPagination) {
	pagination.value = newApiPagination;
}

export function usePagination() {
	return {
		pagination: readonly(pagination),
		setApiPagination,
	};
}
