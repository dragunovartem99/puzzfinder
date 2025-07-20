import { ref, computed, type UnwrapRef } from "vue";
import type { Pagination } from "../types";

const privateState = ref<Pagination>({
	page: 1,
	limit: 24,
	total: 0,
	totalPages: 0,
});

export function setPagination(pagination: UnwrapRef<typeof privateState>) {
	privateState.value = pagination;
}

export function toPrevPage() {
	privateState.value.page++;
}

export function toNextPage() {
	privateState.value.page++;
}

export const pagination = computed(() => privateState.value);
