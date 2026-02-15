<script setup lang="ts">
import type { DesktopShortcut } from "../types";
import TheDesktopShortcut from "./TheDesktopShortcut.vue";

const emit = defineEmits<{
	"app-clicked": [];
}>();

const shortcuts: Array<DesktopShortcut & { onClick?: () => void }> = [
	{
		label: "Puzzfinder",
		icon: "logo.png",
		onClick: () => emit("app-clicked"),
	},
	{
		label: "Lichess Accuracy",
		icon: "shortcuts/lichess-accuracy.png",
		link: "https://dragunovartem99.github.io/lichess-accuracy",
	},
	{
		label: "Vue PGN Viewer",
		icon: "shortcuts/vue-pgn-viewer.png",
		link: "https://dragunovartem99.github.io/vue-pgn-viewer",
	},
	{
		label: "HTML Diagram",
		icon: "shortcuts/html-diagram.png",
		link: "https://dragunovartem99.github.io/html-diagram",
	},
];
</script>

<template>
	<div class="desktop">
		<div class="desktop__shortcuts">
			<TheDesktopShortcut
				v-for="shortcut of shortcuts"
				:key="shortcut.label"
				:shortcut
				@click="shortcut.onClick"
			/>
		</div>
	</div>
</template>

<style scoped>
.desktop {
	background-color: teal;
	height: 100dvh;
	padding: 10px;
}

.desktop__shortcuts {
	display: inline-flex;
	flex-wrap: wrap;
	flex-direction: column;
	gap: 10px;
}

.desktop__shortcuts > * {
	width: 80px;
}
</style>
