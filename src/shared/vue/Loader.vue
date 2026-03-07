<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const progress = ref(0);
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
	interval = setInterval(
		() => {
			if (progress.value < 100) progress.value += Math.random() * 50;
		},
		250 + Math.random() * 250
	);
});

onUnmounted(() => clearInterval(interval));
</script>

<template>
	<div class="progress-indicator segmented">
		<span
			class="progress-indicator-bar"
			:style="{ width: progress + '%' }"
		/>
	</div>
</template>
