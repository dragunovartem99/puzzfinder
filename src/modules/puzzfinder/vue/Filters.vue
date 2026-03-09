<script setup lang="ts">
import { Range } from "@/shared";
import type { API } from "@/shared";

const rating = defineModel<API.Range>("rating", { required: true });
const movesNumber = defineModel<API.Range>("movesNumber", { required: true });
const popularity = defineModel<API.Range>("popularity", { required: true });
</script>

<template>
	<div class="filters">
		<Range
			label="Rating"
			v-model="rating"
		/>
		<Range
			label="Moves"
			v-model="movesNumber"
		/>
		<Range
			label="Popularity"
			v-model="popularity"
		/>
	</div>
</template>

<style lang="css" scoped>
.filters {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
