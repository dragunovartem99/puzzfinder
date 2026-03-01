<script setup lang="ts">
import type { UI } from "@/types";

const { shortcut } = defineProps<{
	shortcut: UI.Shortcut;
}>();

const element = shortcut.url ? "a" : "div";
const attributes = shortcut.url ? { href: shortcut.url, target: "_blank" } : null;

const alt = `Shortcut of "${shortcut.label}"`;
</script>

<template>
	<component
		:is="element"
		v-bind="attributes"
		class="shortcut"
	>
		<img
			:src="shortcut.icon"
			:alt
		/>
		<span> {{ shortcut.label }} </span>
	</component>
</template>

<style lang="css" scoped>
.shortcut {
	font-family: "Pixelated MS Sans Serif";
	display: grid;
	width: 80px;
	height: 80px;
	font-size: 14px;
	place-items: center;
	text-decoration: none;
	cursor: pointer;
}

img {
	width: 32px;
}

span {
	text-align: center;
	color: white;
}
</style>
