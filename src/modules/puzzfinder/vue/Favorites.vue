<script setup lang="ts">
import { Loader } from "@/shared";
import type { UI } from "@/shared";

import Puzzles from "./Puzzles.vue";

defineProps<{
	folder: UI.Folder;
	puzzles: UI.Puzzle[];
	isPending: boolean;
	isError: boolean;
}>();
</script>

<template>
	<b v-if="folder.puzzles.length === 0">
		Press the heart button on a puzzle to save it to "{{ folder.name }}"
	</b>
	<Loader v-else-if="isPending" />
	<b v-else-if="isError">Failed to load the folder, please try again</b>
	<Puzzles
		v-else
		class="puzzles-scroll"
		:puzzles
		:folder-id="folder.id"
	/>
</template>
