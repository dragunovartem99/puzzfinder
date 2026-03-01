<script setup lang="ts">
import { type UI } from "../types";

import Shortcut from "./Shortcut.vue";

const shortcuts: UI.Shortcut[] = [
	{
		label: "Puzzfinder",
		icon: "logo.png",
		onclick: () => {},
	},
	{
		label: "Lichess Accuracy",
		icon: "shortcut/lichess-accuracy.png",
		url: "https://dragunovartem99.github.io/lichess-accuracy/",
	},
	{
		label: "Vue PGN Viewer",
		icon: "shortcut/vue-pgn-viewer.png",
		url: "https://dragunovartem99.github.io/vue-pgn-viewer/",
	},
	{
		label: "HTML Diagram",
		icon: "shortcut/html-diagram.png",
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
	height: 100vh;
}

ul {
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	align-items: start;
}
</style>
