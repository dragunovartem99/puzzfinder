<script setup lang="ts">
import { computed } from "vue";

import type { UI } from "@/shared";

import { figurine } from "../map";
import PrintBoard from "./PrintBoard.vue";

const DIAGRAMS_PER_PAGE = 6;
const SOLUTIONS_PER_PAGE = 40;

const { puzzles, withSolutions, title } = defineProps<{
	puzzles: UI.Puzzle[];
	withSolutions: boolean;
	title: string;
}>();

const numbered = computed(() => puzzles.map((puzzle, index) => ({ puzzle, number: index + 1 })));

function paginate<T>(items: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(items.length / size) }, (_, page) =>
		items.slice(page * size, (page + 1) * size)
	);
}

const diagramPages = computed(() => paginate(numbered.value, DIAGRAMS_PER_PAGE));
const solutionPages = computed(() =>
	withSolutions ? paginate(numbered.value, SOLUTIONS_PER_PAGE) : []
);
const total = computed(() => diagramPages.value.length + solutionPages.value.length);

const solver = (puzzle: UI.Puzzle) => (puzzle.flipped ? "Black" : "White");
</script>

<template>
	<div class="print-sheet">
		<section
			v-for="(page, index) in diagramPages"
			:key="`diagrams-${index}`"
			class="page"
		>
			<header>
				<span>{{ title }}</span>
				<span>{{ index + 1 }} / {{ total }}</span>
			</header>
			<div class="diagrams">
				<figure
					v-for="{ puzzle, number } in page"
					:key="puzzle.id"
				>
					<PrintBoard
						:fen="puzzle.positions[0] ?? puzzle.fen"
						:flipped="puzzle.flipped"
					/>
					<figcaption>
						<span
							><b>{{ number }}.</b> {{ solver(puzzle) }} to move &middot;
							{{ puzzle.rating }}</span
						>
						<span class="id">{{ puzzle.id }}</span>
					</figcaption>
				</figure>
			</div>
		</section>
		<section
			v-for="(page, index) in solutionPages"
			:key="`solutions-${index}`"
			class="page"
		>
			<header>
				<span>{{ title }} &middot; Solutions</span>
				<span>{{ diagramPages.length + index + 1 }} / {{ total }}</span>
			</header>
			<ol class="solutions">
				<li
					v-for="{ puzzle, number } in page"
					:key="puzzle.id"
					:value="number"
				>
					{{ figurine(puzzle.solution) }}
				</li>
			</ol>
		</section>
	</div>
</template>

<style lang="css" scoped>
.print-sheet {
	display: none;
}

@media print {
	.print-sheet {
		display: block;
		font: 11pt/1.4 sans-serif;
		color: #000;
	}

	/* Exactly one sheet each: a spill of even 1mm would print a blank page */
	.page {
		box-sizing: border-box;
		height: 297mm;
		padding: 12mm 15mm;
		overflow: hidden;
		break-after: page;
	}

	.page:last-child {
		break-after: auto;
	}

	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8mm;
		padding-bottom: 2mm;
		border-bottom: 0.3mm solid #000;
		font-weight: bold;
	}

	.diagrams {
		display: grid;
		grid-template-columns: repeat(2, 70mm);
		justify-content: center;
		column-gap: 20mm;
		row-gap: 8mm;
	}

	figure {
		margin: 0;
		break-inside: avoid;
	}

	figcaption {
		display: flex;
		justify-content: space-between;
		margin-top: 2mm;
	}

	.id {
		color: #666;
		font-size: 9pt;
	}

	.solutions {
		columns: 2;
		column-gap: 15mm;
		margin: 0;
		padding-left: 8mm;
		line-height: 1.8;
	}
}
</style>

<style lang="css">
@media print {
	/* No margin means browsers print no URL and date headers; .page pads instead */
	@page {
		size: A4;
		margin: 0;
	}

	body > *:not(.print-sheet) {
		display: none !important;
	}

	body {
		background: #fff !important;
	}
}
</style>
