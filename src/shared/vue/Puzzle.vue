<script setup lang="ts">
import type { UI } from "../types";
import Window from "./Window.vue";

const props = defineProps<{ puzzle: UI.Puzzle }>();

const PUZZLE_WINDOW: UI.Window = {
	title: props.puzzle.duration,
	controls: {},
};
</script>

<template>
	<Window :window="PUZZLE_WINDOW">
		<a
			:href="puzzle.url"
			target="_blank"
		>
			<html-diagram
				:fen="puzzle.fen"
				:flipped="puzzle.flipped ? 'flipped' : null"
			/>
		</a>
		<p><b>Rating:</b> {{ puzzle.rating }}</p>
		<p><b>Themes:</b> {{ puzzle.themes }}</p>
		<template #status-bar>
			<p class="status-bar-field"><b>Played:</b> {{ puzzle.timesPlayed }}</p>
			<p class="status-bar-field"><b>Popularity:</b> {{ puzzle.popularity }}</p>
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

a {
	text-decoration: none;
}
</style>
