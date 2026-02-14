<script setup lang="ts">
const emit = defineEmits<{ "close-clicked": [] }>();
</script>

<template>
	<div class="window">
		<div class="title-bar">
			<slot name="title"></slot>
			<div class="title-bar-controls">
				<button @click="emit('close-clicked')" aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body scroll">
			<slot name="body"></slot>
		</div>
		<div class="status-bar">
			<slot name="status"></slot>
		</div>
	</div>
</template>

<style scoped>
.scroll {
	overflow-y: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.scroll::-webkit-scrollbar {
	display: none;
}
</style>
