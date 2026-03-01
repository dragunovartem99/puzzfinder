<script setup lang="ts">
import { ref } from "vue";
import { Desktop } from "./modules/desktop";
import { type UI, Window } from "@/shared";

const isMainWindowShown = ref(true);

const mainWindow: UI.Window = {
	title: "Puzzfinder",
	controls: { close: true },
};
</script>

<template>
	<Desktop @main-shortcut-click="isMainWindowShown = true" />
	<Window
		v-show="isMainWindowShown"
		:window="mainWindow"
		class="main-window"
		@close="isMainWindowShown = false"
	>
		<button>Search</button>
	</Window>
</template>

<style>
* {
	margin: 0;
	box-sizing: border-box;
}

body {
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
