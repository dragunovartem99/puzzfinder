<script setup lang="ts">
import { computed, ref } from "vue";

import type { UI } from "../types";
import Window from "./Window.vue";

const props = defineProps<{ puzzle: UI.Puzzle }>();

const PUZZLE_WINDOW: UI.Window = {
	title: props.puzzle.length,
	controls: {},
};

const last = props.puzzle.positions.length - 1;
const step = ref(0);
const fen = computed(() => props.puzzle.positions[step.value] ?? props.puzzle.fen);
</script>

<template>
	<Window :window="PUZZLE_WINDOW">
		<a
			:href="puzzle.url"
			target="_blank"
		>
			<html-diagram
				:fen
				:flipped="puzzle.flipped ? 'flipped' : null"
			/>
		</a>
		<div
			class="stepper"
			role="group"
			aria-label="Solution stepper"
		>
			<button
				aria-label="First move"
				:disabled="step === 0"
				@click="step = 0"
			>
				&laquo;
			</button>
			<button
				aria-label="Previous move"
				:disabled="step === 0"
				@click="step--"
			>
				&lsaquo;
			</button>
			<button
				aria-label="Next move"
				:disabled="step === last"
				@click="step++"
			>
				&rsaquo;
			</button>
			<button
				aria-label="Last move"
				:disabled="step === last"
				@click="step = last"
			>
				&raquo;
			</button>
		</div>
		<template #status-bar>
			<p class="status-bar-field">Rating: {{ puzzle.rating }}</p>
		</template>
	</Window>
</template>

<style lang="css" scoped>
.window {
	background-color: var(--button-face);
	display: flex;
	flex-direction: column;
}

:deep(.title-bar) {
	background: linear-gradient(90deg, var(--text-color), var(--dialog-gray));
}

:deep(.window-body) {
	margin: 0 0 10px;
}

:deep(.window-body p) {
	margin: 10px var(--element-spacing) 0;
}

a {
	text-decoration: none;
}

.stepper {
	display: flex;
	gap: 2px;
	margin: 10px var(--element-spacing);
}

.stepper button {
	flex: 1;
	min-width: 0;
	padding: 0;
	font-weight: bold;
}
</style>
