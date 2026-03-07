<script setup lang="ts">
import type { UI } from "../types";

defineProps<{
	tabs: UI.Tab[];
	activeTab?: UI.Tab;
}>();

const emit = defineEmits<{
	"tab-select": [tab: UI.Tab];
}>();
</script>

<template>
	<div>
		<menu role="tablist">
			<li
				v-for="(tab, index) in tabs"
				role="tab"
				:key="index"
				:aria-selected="tab.id === activeTab?.id"
				@click="emit('tab-select', tab)"
			>
				<a>{{ tab.label }}</a>
			</li>
		</menu>
		<div
			class="window"
			role="tabpanel"
		>
			<div class="window-body">
				<slot />
			</div>
		</div>
	</div>
</template>

<style scoped>
div[role="tabpanel"] {
	flex-grow: 1;
	min-height: 0;
	display: flex;
	flex-direction: column;
}

.window-body {
	flex-grow: 1;
	min-height: 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
</style>
