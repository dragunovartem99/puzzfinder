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
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 5px;
}

@media (min-width: 768px) {
	.puzzles {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 15px;
	}
}
</style>
