<script setup lang="ts">
import { searchPuzzles } from "../api";
import { usePagination, usePuzzles } from "../state";

async function submitForm() {
	const response = await searchPuzzles();

	if (response) {
		usePuzzles().setState(response.data);
		usePagination().setState(response.pagination);
	}
}
</script>

<template>
	<form @submit.prevent="submitForm">
		<button>Search</button>
	</form>
</template>
