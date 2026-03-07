<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const progress = ref(0);
let interval: ReturnType<typeof setInterval>;

const MAX_PROGRESS = 100;
const MAX_INCREMENT = 50;
const BASE_INTERVAL = 250;
const INTERVAL_VARIANCE = 250;

function incrementProgress() {
	progress.value = Math.min(progress.value + Math.random() * MAX_INCREMENT, MAX_PROGRESS);
}

function getRandomInterval() {
	return BASE_INTERVAL + Math.random() * INTERVAL_VARIANCE;
}

onMounted(() => {
	interval = setInterval(incrementProgress, getRandomInterval());
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
