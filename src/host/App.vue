<script setup lang="ts">
import { provide, ref } from "vue";

import { TheDesktop } from "../modules/desktop";
import { MainWindow } from "../modules/main-window";

const isMainWindowOpen = ref(true);

function toggleMainWindow() {
	isMainWindowOpen.value = !isMainWindowOpen.value;
}

provide("toggle-main-window", toggleMainWindow);
</script>

<template>
	<TheDesktop @app-clicked="toggleMainWindow" />
	<MainWindow v-show="isMainWindowOpen" />
</template>
