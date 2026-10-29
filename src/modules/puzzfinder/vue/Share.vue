<script setup lang="ts">
import { ref } from "vue";

import { mapShareUrl } from "../map";

const { ids } = defineProps<{ ids: string[] }>();

const COPIED_FOR = 1500;
const copied = ref(false);

async function share() {
	await navigator.clipboard.writeText(mapShareUrl(ids));
	copied.value = true;
	setTimeout(() => (copied.value = false), COPIED_FOR);
}
</script>

<template>
	<button
		type="button"
		:disabled="ids.length === 0"
		@click="share"
	>
		{{ copied ? "Link copied" : "Share" }}
	</button>
</template>
