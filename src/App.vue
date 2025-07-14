<script setup lang="ts">
import { ref } from "vue";

import { TheDesktop } from "./modules/desktop";
import TheWindow from "./modules/main-window/components/TheWindow.vue";

const isOpen = ref(true);
</script>

<template>
	<TheDesktop @app-clicked="isOpen = true" />
	<TheWindow v-show="isOpen" @close-clicked="isOpen = false" />
</template>

<style scoped></style>
