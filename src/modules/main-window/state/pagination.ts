import type { PaginationResponse } from "@/shared/types";

import { ref, readonly } from "vue";

const pagination = ref<PaginationResponse>({
	page: 1,
	limit: 24,
	total: 0,
	totalPages: 0,
});

function setPagination(value: PaginationResponse) {
	pagination.value = value;
}

export function usePagination() {
	return {
		pagination: readonly(pagination),
		setPagination,
	};
}
