<script setup lang="ts">
import { computed } from "vue";
import type { Puzzle } from "../types";
import { puzzleThemes } from "../../../static/puzzleThemes";
import { hiddenThemes } from "../../../static/hiddenThemes";
import { formatNumber } from "../../shared/utils/formatNumber";

const props = defineProps<{ puzzle: Puzzle }>();

const themes = computed(() =>
	props.puzzle.themes
		.filter((value: string) => !hiddenThemes.includes(value))
		.map((value: string) =>
			puzzleThemes
				.flatMap((group) => group.options)
				.find((puzzle) => puzzle.value === value)!
				.text.toLowerCase()
		)
		.join(", ")
);

const played = computed(() => formatNumber(props.puzzle.nbPlays));

const movesNumber = computed(() =>
	props.puzzle.movesNumber === 1 ? "1 move" : `${props.puzzle.movesNumber} moves`
);
</script>

<template>
	<article class="window">
		<div class="title-bar">
			<div class="title-bar-text">{{ movesNumber }}</div>
		</div>
		<div class="window-body">
			<a
				class="puzzle-link"
				:href="`https://lichess.org/training/${puzzle.puzzleId}`"
				target="_blank"
			>
				<html-diagram :fen="puzzle.fen"></html-diagram>
			</a>
			<p><b>Rating:</b> {{ puzzle.rating }}</p>
			<p><b>Themes:</b> {{ themes }}</p>
			<a :href="puzzle.gameUrl" target="_blank" class="game-link">View game</a>
		</div>
		<div class="status-bar">
			<p class="status-bar-field"><b>Played:</b> {{ played }}</p>
			<p class="status-bar-field"><b>Popularity:</b> {{ puzzle.popularity }}</p>
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
.puzzle-link {
	text-decoration: none;
}
.game-link {
	display: block;
	margin-bottom: 5px;
}
.status-bar {
	margin-top: auto;
}
</style>
