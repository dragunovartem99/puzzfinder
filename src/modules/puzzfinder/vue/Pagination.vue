<script setup lang="ts">
import { type API } from "@/shared";

const props = defineProps<{
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
			:class="{ 'disabled-link': props.pagination.page <= 1 }"
			href="#"
			@click.prevent="emit('prev')"
		>
			Prev
		</a>
		<a
			:class="{ 'disabled-link': props.pagination.page >= props.pagination.totalPages }"
			href="#"
			@click.prevent="emit('next')"
		>
			Next
		</a>
	</p>
	<p class="status-bar-field">
		<b>Page:</b> {{ props.pagination.page }} of
		{{ props.pagination.totalPages.toLocaleString() }}
	</p>
	<p class="status-bar-field"><b>Results:</b> {{ props.pagination.total.toLocaleString() }}</p>
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
