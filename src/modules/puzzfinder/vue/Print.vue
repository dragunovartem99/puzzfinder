<script setup lang="ts">
import { ref } from "vue";

import type { UI } from "@/shared";

import PrintSheet from "./PrintSheet.vue";

defineProps<{ puzzles: UI.Puzzle[]; title: string }>();

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
		<div class="actions">
			<button
				type="button"
				:disabled="puzzles.length === 0"
				@click="print"
			>
				Print ({{ puzzles.length }})
			</button>
			<slot />
		</div>
		<Teleport to="body">
			<PrintSheet
				v-if="puzzles.length > 0"
				:puzzles
				:with-solutions
				:title
			/>
		</Teleport>
	</div>
</template>

<style lang="css" scoped>
.print {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.field-row {
	margin: 0;
}

.actions {
	display: flex;
	gap: 10px;
}

.actions > :deep(*) {
	flex: 1;
}
</style>
