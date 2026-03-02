<script setup lang="ts">
import { type UI, Window } from "@/shared";

const emit = defineEmits<{
	close: [windowID: UI.Window['id']];
}>();

const PUZZFINDER_WINDOW: UI.Window = {
	id: 'puzzfinder',
	title: "Puzzfinder",
	controls: { close: true },
	statusBar: [],
};

function handleClose(): void {
	emit("close", PUZZFINDER_WINDOW.id);
}
</script>

<template>
	<Window
		@close="handleClose"
		:window="PUZZFINDER_WINDOW"
	>
		Hello
	</Window>
</template>
