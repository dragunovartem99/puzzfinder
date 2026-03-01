<script setup lang="ts">
import type { UI } from "@/shared";
import Shortcut from "./Shortcut.vue";

const emit = defineEmits<{
	"main-shortcut-click": [];
}>();

const shortcuts: UI.Shortcut[] = [
	{
		icon: "logo.png",
		label: "Puzzfinder",
		url: "#",
		onclick: () => emit("main-shortcut-click"),
	},
	{
		icon: "shortcut/lichess-accuracy.png",
		label: "Lichess Accuracy",
		url: "https://dragunovartem99.github.io/lichess-accuracy/",
	},
	{
		icon: "shortcut/vue-pgn-viewer.png",
		label: "Vue PGN Viewer",
		url: "https://dragunovartem99.github.io/vue-pgn-viewer/",
	},
	{
		icon: "shortcut/html-diagram.png",
		label: "HTML Diagram",
		url: "https://dragunovartem99.github.io/html-diagram/",
	},
];
</script>

<template>
	<div class="desktop">
		<ul>
			<li
				v-for="(shortcut, index) of shortcuts"
				:key="index"
			>
				<Shortcut
					:shortcut
					@click="shortcut.onclick"
				/>
			</li>
		</ul>
	</div>
</template>

<style lang="css" scoped>
.desktop {
	background-color: teal;
	height: 100dvh;
}

ul {
	padding: 10px;
	list-style: none;
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 20px;
}
</style>
