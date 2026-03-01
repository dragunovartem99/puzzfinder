<script setup lang="ts">
import type { UI } from "../types";

defineProps<{ window: UI.Window }>();

const emit = defineEmits<{
	close: [];
}>();
</script>

<template>
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">{{ window.title }}</div>
			<div
				class="title-bar-controls"
				v-if="window.controls"
			>
				<button
					aria-label="Close"
					v-if="window.controls.close"
					@click="emit('close')"
				></button>
			</div>
		</div>
		<div class="window-body">
			<slot />
		</div>
		<div
			class="status-bar"
			v-if="window.statusBar?.length"
		>
			<p
				class="status-bar-field"
				v-for="field in window.statusBar"
			>
				{{ field }}
			</p>
		</div>
	</div>
</template>
