<script setup lang="ts">
import { ref } from "vue";
import type { UI } from "./types";
import { Desktop } from "./modules/desktop";
import { Window } from "./modules/window";

const isMainWindowShown = ref(true);

const window: UI.Window = {
	title: "Puzzfinder",
	controls: {
		close: true,
	},
};
</script>

<template>
	<Desktop @main-app-started="isMainWindowShown = true" />
	<Window
		v-show="isMainWindowShown"
		:window
		class="main-window"
		@close="isMainWindowShown = false"
	>
		<button>Hello</button>
	</Window>
</template>

<style>
* {
	margin: 0;
	box-sizing: border-box;
}

body {
	-webkit-font-smoothing: antialiased;
	font-synthesis: none;
	--ui-scale: 1.5;
}

.main-window {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 800px;
}
</style>
