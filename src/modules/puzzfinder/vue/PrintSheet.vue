<script setup lang="ts">
import { computed } from "vue";

import type { UI } from "@/shared";

import { figurine } from "../map";
import PrintBoard from "./PrintBoard.vue";

const PER_PAGE = 6;

const props = defineProps<{
	puzzles: UI.Puzzle[];
	withSolutions: boolean;
}>();

const numbered = computed(() =>
	props.puzzles.map((puzzle, index) => ({ puzzle, number: index + 1 }))
);

function paginate<T>(items: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(items.length / size) }, (_, page) =>
		items.slice(page * size, (page + 1) * size)
	);
}

const diagramPages = computed(() => paginate(numbered.value, PER_PAGE));
const solutionPages = computed(() => paginate(numbered.value, 20));

const solver = (puzzle: UI.Puzzle) => (puzzle.flipped ? "Black" : "White");
</script>

<template>
	<div class="print-sheet">
		<section
			v-for="(page, index) in diagramPages"
			:key="`diagrams-${index}`"
			class="page diagrams"
		>
			<figure
				v-for="{ puzzle, number } in page"
				:key="puzzle.id"
			>
				<PrintBoard
					:fen="puzzle.positions[0] ?? puzzle.fen"
					:flipped="puzzle.flipped"
				/>
				<figcaption>
					<b>{{ number }}.</b> {{ solver(puzzle) }} to move &middot; {{ puzzle.rating }}
				</figcaption>
			</figure>
		</section>
		<template v-if="withSolutions">
			<section
				v-for="(page, index) in solutionPages"
				:key="`solutions-${index}`"
				class="page solutions"
			>
				<h1>Solutions</h1>
				<ol>
					<li
						v-for="{ puzzle, number } in page"
						:key="puzzle.id"
						:value="number"
					>
						{{ figurine(puzzle.solution) }}
					</li>
				</ol>
			</section>
		</template>
	</div>
</template>

<style lang="css" scoped>
.print-sheet {
	display: none;
}

@media print {
	.print-sheet {
		display: block;
	}

	.page {
		break-after: page;
	}

	.page:last-child {
		break-after: auto;
	}

	.diagrams {
		display: grid;
		grid-template-columns: repeat(2, 70mm);
		justify-content: space-between;
		row-gap: 6mm;
	}

	figure {
		margin: 0;
		break-inside: avoid;
	}

	figcaption {
		margin-top: 2mm;
		font: 11pt sans-serif;
	}

	.solutions h1 {
		margin: 0 0 6mm;
		font: bold 16pt sans-serif;
	}

	.solutions ol {
		margin: 0;
		padding-left: 8mm;
		font: 11pt/1.6 sans-serif;
	}
}
</style>

<style lang="css">
@media print {
	body > *:not(.print-sheet) {
		display: none !important;
	}

	body {
		background: #fff !important;
	}
}
</style>
