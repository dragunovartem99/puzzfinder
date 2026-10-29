<script setup lang="ts">
import { computed, ref } from "vue";

import { useFolders } from "../composables/useFolders";
import type { UI } from "../types";
import FolderMenu from "./FolderMenu.vue";
import Window from "./Window.vue";

// Inside a folder the heart removes from that folder; elsewhere it saves
const { puzzle, folderId } = defineProps<{ puzzle: UI.Puzzle; folderId?: UI.Folder["id"] }>();

const PUZZLE_WINDOW: UI.Window = {
	title: puzzle.length,
	controls: {},
};

const last = puzzle.positions.length - 1;
const step = ref(0);
const { folders, selected, has, isSaved, toggle } = useFolders();
const menuId = `folder-menu-${puzzle.id}`;

// With a single folder there is nothing to choose, so the heart toggles directly
const target = computed(() => {
	if (folderId) return folderId;
	return folders.value.length === 1 ? selected.value.id : null;
});
const isFavorite = computed(() =>
	target.value ? has({ folderId: target.value, puzzleId: puzzle.id }) : isSaved(puzzle.id)
);

function onHeart() {
	if (target.value) toggle({ folderId: target.value, puzzleId: puzzle.id });
}
const fen = computed(() => puzzle.positions[step.value] ?? puzzle.fen);
</script>

<template>
	<Window :window="PUZZLE_WINDOW">
		<a
			:href="puzzle.url"
			target="_blank"
		>
			<html-diagram
				:fen
				:flipped="puzzle.flipped ? 'flipped' : null"
			/>
		</a>
		<div
			class="stepper"
			role="group"
			aria-label="Solution stepper"
		>
			<button
				aria-label="First move"
				:disabled="step === 0"
				@click="step = 0"
			>
				&laquo;
			</button>
			<button
				aria-label="Previous move"
				:disabled="step === 0"
				@click="step--"
			>
				&lsaquo;
			</button>
			<button
				aria-label="Next move"
				:disabled="step === last"
				@click="step++"
			>
				&rsaquo;
			</button>
			<button
				aria-label="Last move"
				:disabled="step === last"
				@click="step = last"
			>
				&raquo;
			</button>
		</div>
		<template #controls>
			<button
				class="favorite"
				:aria-label="isFavorite ? 'Remove from folder' : 'Save to folder'"
				:aria-pressed="isFavorite"
				:popovertarget="target ? undefined : menuId"
				@click="onHeart"
			></button>
			<FolderMenu
				v-if="!target"
				:id="menuId"
				:puzzle-id="puzzle.id"
			/>
		</template>
		<template #status-bar>
			<p class="status-bar-field">Rating: {{ puzzle.rating }}</p>
		</template>
	</Window>
</template>

<style lang="css" scoped>
.window {
	background-color: var(--button-face);
	display: flex;
	flex-direction: column;
}

:deep(.title-bar) {
	background: linear-gradient(90deg, var(--text-color), var(--dialog-gray));
}

:deep(.window-body) {
	margin: 0 0 10px;
}

:deep(.window-body p) {
	margin: 10px var(--element-spacing) 0;
}

a {
	text-decoration: none;
}

.stepper {
	display: flex;
	gap: 2px;
	margin: 10px var(--element-spacing);
}

.stepper button {
	flex: 1;
	min-width: 0;
	padding: 0;
	font-weight: bold;
}

.favorite {
	background-image: url("/icon/heart.svg");
	background-repeat: no-repeat;
	background-position: center;
	background-size: auto 60%;
}

.favorite[aria-pressed="true"] {
	background-image: url("/icon/heart-filled.svg");
}
</style>
