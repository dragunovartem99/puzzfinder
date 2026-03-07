<script setup lang="ts">
import type { UI } from "../types";
import Pair from "./Pair.vue";
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
		<Pair label="Rating:"> {{ puzzle.rating }} </Pair>
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
</style>
