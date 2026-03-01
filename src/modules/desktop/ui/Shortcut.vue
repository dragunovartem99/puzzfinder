<script setup lang="ts">
import type { UI } from "@/types";

const { shortcut } = defineProps<{
	shortcut: UI.Shortcut;
}>();

const alt = `Shortcut of "${shortcut.label}"`;
</script>

<template>
	<a
		:href="shortcut.url"
		class="shortcut"
	>
		<img
			:src="shortcut.icon"
			:alt
		/>
		<span> {{ shortcut.label }} </span>
	</a>
</template>

<style lang="css" scoped>
.shortcut {
	font-family: "Pixelated MS Sans Serif";
	display: grid;
	width: 100px;
	height: 100px;
	place-items: center;
	text-decoration: none;
	cursor: pointer;
}

img {
	width: 40px;
}

span {
	text-align: center;
	color: white;
}
</style>
