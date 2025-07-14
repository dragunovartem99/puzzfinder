<script setup lang="ts">
import TheShortcut from "./TheShortcut.vue";
const emit = defineEmits(["app-clicked"]);
const shortcuts = [
	{
		label: "Puzzfinder",
		onClick: () => emit("app-clicked"),
		icon: "logo.png",
	},
	{
		label: "Lichess Accuracy",
		link: "https://dragunovartem99.github.io/lichess-accuracy",
		icon: "shortcuts/lichess-accuracy.png",
	},
	{
		label: "Vue PGN Viewer",
		link: "https://dragunovartem99.github.io/vue-pgn-viewer",
		icon: "shortcuts/vue-pgn-viewer.png",
	},
	{
		label: "HTML Diagram",
		link: "https://dragunovartem99.github.io/html-diagram",
		icon: "shortcuts/html-diagram.png",
	},
];
</script>

<template>
	<div class="desktop">
		<div class="shortcuts">
			<TheShortcut v-for="shortcut of shortcuts" @click="shortcut.onClick" :shortcut />
		</div>
	</div>
</template>

<style scoped>
.desktop {
	background-color: teal;
	height: 100dvh;
	padding: 10px;
}
.shortcuts {
	display: inline-flex;
	flex-wrap: wrap;
	flex-direction: column;
	gap: 10px;
}
.shortcuts > * {
	width: 80px;
}
</style>
