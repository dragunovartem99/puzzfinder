<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	fen: string;
	flipped: boolean;
}>();

// Glyphs of the "Diagram Smart" font: [light square, dark square]
const GLYPHS: Record<string, [string, string]> = {
	"K": ["K", "k"],
	"Q": ["Q", "q"],
	"R": ["R", "r"],
	"B": ["B", "b"],
	"N": ["N", "n"],
	"P": ["P", "p"],
	"k": ["Ц", "ц"],
	"q": ["Ф", "ф"],
	"r": ["Л", "л"],
	"b": ["С", "с"],
	"n": ["К", "к"],
	"p": ["П", "п"],
	" ": ["+", "="],
};

const cells = computed(() => {
	const placement = props.fen.split(" ")[0] ?? "";
	const squares = [...placement.split("/").join("")].flatMap((char) =>
		/\d/u.test(char) ? Array.from({ length: Number(char) }, () => " ") : char
	);

	return Array.from({ length: 64 }, (_, index) => {
		const isDark = ((index * 9) & 8) !== 0;
		const piece = squares[props.flipped ? 63 - index : index] ?? " ";
		return GLYPHS[piece]![isDark ? 1 : 0]!;
	});
});
</script>

<template>
	<div
		class="board"
		role="img"
		:aria-label="fen"
	>
		<span
			v-for="(glyph, index) in cells"
			:key="index"
			>{{ glyph }}</span
		>
	</div>
</template>

<style lang="css" scoped>
/* Fixed units on purpose: container queries were laid out inconsistently by Firefox when printing */
.board {
	--cell: 8.75mm;

	display: grid;
	grid-template-columns: repeat(8, var(--cell));
	grid-auto-rows: var(--cell);
	width: calc(var(--cell) * 8);
	font-family: var(--diagram-font);
	font-size: var(--cell);
	line-height: 1;
	color: #000;
	user-select: none;
}

span {
	overflow: hidden;
	white-space: nowrap;
}
</style>
