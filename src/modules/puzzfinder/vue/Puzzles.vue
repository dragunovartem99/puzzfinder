<script setup lang="ts">
import { computed } from "vue";
import { Puzzle } from "@/shared";
import { usePuzzles } from "../state";
import { mapPuzzle } from "../map";

const { state } = usePuzzles();

const puzzles = computed(() => state.value.map(mapPuzzle));
</script>

<template>
	<section class="puzzles">
		<Puzzle
			v-for="puzzle of puzzles"
			:key="puzzle.id"
			:puzzle
		/>
	</section>
</template>

<style lang="css" scoped>
.puzzles {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px;

	max-height: 500px;
	overflow-y: scroll;
}
</style>
