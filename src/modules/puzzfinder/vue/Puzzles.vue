<script setup lang="ts">
import { Puzzle, type UI } from "@/shared";

defineProps<{
	puzzles: UI.Puzzle[];
}>();
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
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;

	max-height: 500px;
	overflow-y: scroll;
}
</style>
