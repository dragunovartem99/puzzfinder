<script setup lang="ts">
import type { UI } from "@/shared";

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
	display: flex;
	width: 90px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	gap: 15px;
}

img {
	width: 32px;
}

span {
	text-align: center;
	color: white;
}
</style>
