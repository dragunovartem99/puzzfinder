<script setup lang="ts">
import { ThePuzzle } from "@/shared/components";
import { usePuzzles } from "../state";
const { puzzles } = usePuzzles();
</script>

<template>
	<div class="main-window-puzzles">
		<ThePuzzle
			v-for="puzzle of puzzles"
			:puzzle
			:key="puzzle.puzzleId"
		/>
	</div>
</template>

<style scoped>
.main-window-puzzles {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
}
</style>
