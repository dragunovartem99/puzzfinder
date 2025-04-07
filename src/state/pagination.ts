import { ref } from "vue";

export const pagination = ref({
	page: 1,
	limit: 24,
	total: 0,
	totalPages: 0,
});
