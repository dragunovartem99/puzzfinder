<script setup lang="ts">
import { provide, ref } from "vue";

import { TheDesktop } from "./modules/desktop";
import { TheWindow } from "./modules/main-window";

const isOpen = ref(true);

function toggleMainWindow() {
	isOpen.value = !isOpen.value;
}

provide("toggle-main-window", toggleMainWindow);
</script>

<template>
	<TheDesktop @app-clicked="toggleMainWindow" />
	<TheWindow v-show="isOpen" />
</template>
