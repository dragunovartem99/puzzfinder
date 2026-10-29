<script setup lang="ts">
import { ref } from "vue";

import { useFolders } from "../composables/useFolders";
import type { UI } from "../types";

const { id, puzzleId } = defineProps<{ id: string; puzzleId: UI.Puzzle["id"] }>();

const { folders, has, toggle, create } = useFolders();
const name = ref("");

function add() {
	const folder = create(name.value.trim() || "New folder");
	toggle({ folderId: folder.id, puzzleId });
	name.value = "";
}
</script>

<template>
	<!-- Out of the puzzle's title bar, whose button styles would hit "Add" -->
	<Teleport to="body">
		<div
			:id
			popover="auto"
			class="window folder-menu"
		>
			<div class="title-bar">
				<div class="title-bar-text">Save to folder</div>
				<div class="title-bar-controls">
					<button
						aria-label="Close"
						:popovertarget="id"
						popovertargetaction="hide"
					></button>
				</div>
			</div>
			<div class="window-body">
				<div
					v-for="folder in folders"
					:key="folder.id"
					class="field-row"
				>
					<input
						:id="`${id}-${folder.id}`"
						type="checkbox"
						:checked="has({ folderId: folder.id, puzzleId })"
						@change="toggle({ folderId: folder.id, puzzleId })"
					/>
					<label :for="`${id}-${folder.id}`">{{ folder.name }}</label>
				</div>
				<form
					class="field-row new-folder"
					@submit.prevent="add"
				>
					<input
						v-model="name"
						type="text"
						placeholder="New folder"
						aria-label="New folder name"
					/>
					<button>Add</button>
				</form>
			</div>
		</div>
	</Teleport>
</template>

<style lang="css" scoped>
/* Reset the UA popover box: the window draws its own bevel */
.folder-menu {
	padding: 0;
	border: 0;
	width: 280px;
}

/* Author .window rules would beat the UA rule that hides a closed popover (Firefox) */
.folder-menu:not(:popover-open) {
	display: none;
}

.new-folder {
	margin-top: 10px;
}

.new-folder input {
	flex: 1;
	width: auto;
	min-width: 0;
}
</style>
