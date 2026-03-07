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
	<Pair
		label="Page:"
		class="status-bar-field"
	>
		{{ Math.min(pagination.page, pagination.totalPages) }}
		of
		{{ format(pagination.totalPages) }}
	</Pair>
	<Pair
		label="Results:"
		class="status-bar-field"
	>
		{{ format(pagination.total) }}
	</Pair>
</template>

<style lang="css" scoped>
.disabled-link {
	pointer-events: none;
	outline: none;
	color: var(--dialog-gray);
}

a + a {
	margin-left: 10px;
}
</style>
