<script setup lang="ts">
import { ref } from "vue";

import { useFavorites } from "@/shared";

import PrintSheet from "./PrintSheet.vue";

const { favorites } = useFavorites();

const withSolutions = ref(true);

function print() {
	window.print();
}
</script>

<template>
	<div class="print">
		<div class="field-row">
			<input
				id="print-solutions"
				v-model="withSolutions"
				type="checkbox"
			/>
			<label for="print-solutions">Solutions on separate pages</label>
		</div>
		<button
			type="button"
			@click="print"
		>
			Print ({{ favorites.length }})
		</button>
		<Teleport to="body">
			<PrintSheet
				v-if="favorites.length > 0"
				:puzzles="favorites"
				:with-solutions
			/>
		</Teleport>
	</div>
</template>

<style lang="css" scoped>
.print {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 15px;
	margin-top: 10px;
}

button {
	min-width: 120px;
}

.field-row {
	margin: 0;
}
</style>
