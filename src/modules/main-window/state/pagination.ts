import { ref, computed, type UnwrapRef } from "vue";

const privateState = ref({
	page: 1,
	limit: 24,
	total: 0,
	totalPages: 0,
});

export function setPagination(pagination: UnwrapRef<typeof privateState>) {
	privateState.value = pagination;
}

export const pagination = computed(() => privateState.value);
