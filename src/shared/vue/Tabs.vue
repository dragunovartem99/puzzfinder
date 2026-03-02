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
</template>
