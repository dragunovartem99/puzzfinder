<script setup lang="ts">
import { type API } from "@/shared";

defineProps<{
	pagination: API.Pagination;
}>();

const emit = defineEmits<{
	prev: [];
	next: [];
}>();
</script>

<template>
	<p class="status-bar-field pages">
		<b>Navigate:</b>
		<a
			:class="{ 'disabled-link': pagination.page <= 1 }"
			href="#"
			@click.prevent="emit('prev')"
		>
			Prev
		</a>
		<a
			:class="{ 'disabled-link': pagination.page >= pagination.totalPages }"
			href="#"
			@click.prevent="emit('next')"
		>
			Next
		</a>
	</p>
	<p class="status-bar-field">
		<b>Page:</b> {{ Math.min(pagination.page, pagination.totalPages) }} of
		{{ pagination.totalPages.toLocaleString() }}
	</p>
	<p class="status-bar-field"><b>Results:</b> {{ pagination.total.toLocaleString() }}</p>
</template>

<style lang="css" scoped>
.pages {
	display: flex;
	gap: 10px;
}

.disabled-link {
	pointer-events: none;
	outline: none;
	color: var(--dialog-gray);
}
</style>
