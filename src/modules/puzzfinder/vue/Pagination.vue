<script setup lang="ts">
import { type API, Pair } from "@/shared";

defineProps<{
	pagination: API.Pagination;
}>();

const emit = defineEmits<{
	prev: [];
	next: [];
}>();

function format(num: number) {
	return num.toLocaleString();
}
</script>

<template>
	<Pair
		label="Results:"
		class="status-bar-field"
	>
		{{ format(pagination.total) }}
	</Pair>
	<Pair
		label="Page:"
		class="status-bar-field"
	>
		{{ Math.min(pagination.page, pagination.totalPages) }}
		of
		{{ format(pagination.totalPages) }}
	</Pair>
	<Pair
		label="Navigate:"
		class="status-bar-field"
	>
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
	</Pair>
</template>

<style lang="css" scoped>
.disabled-link {
	pointer-events: none;
	outline: none;
	color: var(--dialog-gray);
}

.status-bar-field {
	justify-content: center;
}

.status-bar-field:first-of-type {
	flex-grow: 6;
}

a + a {
	margin-left: 5px;
}
</style>
