<script setup lang="ts">
import type { UI } from "../types";

defineProps<{ puzzle: UI.Puzzle }>();
</script>

<template>
	<article class="window">
		<div class="title-bar">
			<div class="title-bar-text">{{ puzzle.duration }}</div>
		</div>
		<div class="window-body">
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
		</div>
	</article>
</template>

<style scoped>
.window {
	background-color: var(--button-face);
	display: flex;
	flex-direction: column;
}

.title-bar {
	background: linear-gradient(90deg, var(--text-color), var(--dialog-gray));
}

.status-bar {
	margin-top: auto;
}

a {
	text-decoration: none;
}
</style>
