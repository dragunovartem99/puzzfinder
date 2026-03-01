<script setup lang="ts">
import { type UI } from "../types";

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
	display: flex;
	width: 80px;
	flex-direction: column;
	align-items: center;
}

img {
	width: 32px;
}

span {
	text-align: center;
	color: white;
}
</style>
