<script setup lang="ts">
import { ref } from "vue";
import TheDesktop from "./components/TheDesktop/TheDesktop.vue";
import TheWindow from "./components/TheWindow.vue";

const isOpen = ref(true);
</script>

<template>
	<TheDesktop @app-clicked="isOpen = true" />
	<TheWindow v-show="isOpen" @close-clicked="isOpen = false" />
</template>

<style scoped></style>
