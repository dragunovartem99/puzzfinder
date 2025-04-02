<script setup lang="ts">
const props = defineProps<{ puzzle: any }>();
</script>

<template>
	<article class="window">
		<div class="title-bar">
			<div class="title-bar-text">{{ puzzle.movesNumber }} moves</div>
		</div>
		<div class="window-body">
			<a class="puzzle-link" :href="`https://lichess.org/training/${puzzle.puzzleId}`">
				<html-diagram :fen="puzzle.fen"></html-diagram>
			</a>
			<p><b>Rating:</b> {{ puzzle.rating }}</p>
			<p><b>Themes:</b> {{ puzzle.themes }}</p>
			<a :href="puzzle.gameUrl" target="_blank">View game</a>
		</div>
	</article>
</template>

<style scoped>
.window {
	background-color: var(--button-face);
}
.window-body {
	/* display: flex; */
	/* flex-direction: column; */
}
.title-bar {
	background: linear-gradient(90deg, var(--text-color), var(--dialog-gray));
}
.puzzle-link {
	text-decoration: none;
}
</style>
