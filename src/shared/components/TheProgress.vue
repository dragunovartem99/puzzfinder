<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const progress = ref(0);

const style = computed(() => "width: " + progress.value + "%");

let timeoutId: ReturnType<typeof setTimeout> | null = null;

function randomProgress() {
	const increment = Math.floor(Math.random() * 20) + 5;
	progress.value = Math.min(progress.value + increment, 100);

	if (progress.value < 90) {
		const delay = Math.floor(Math.random() * 400) + 100;
		timeoutId = setTimeout(randomProgress, delay);
	}
}

onMounted(() => randomProgress());
onUnmounted(() => timeoutId && clearTimeout(timeoutId));
</script>

<template>
	<div class="progress-indicator segmented">
		<span class="progress-indicator-bar" :style />
	</div>
</template>
