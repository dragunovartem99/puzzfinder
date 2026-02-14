<script setup lang="ts">
import { ref } from "vue";

import { TheDesktop } from "../modules/the-desktop";
import { MainWindow } from "../modules/main-window";

const isMainWindowOpen = ref(true);

function toggleMainWindow() {
	isMainWindowOpen.value = !isMainWindowOpen.value;
}
</script>

<template>
	<TheDesktop @app-clicked="toggleMainWindow" />
	<MainWindow
		v-show="isMainWindowOpen"
		@close-main-window="toggleMainWindow"
	/>
</template>
