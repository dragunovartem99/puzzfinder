<script setup lang="ts">
import { ref, watch } from "vue";

import { useFolders } from "@/shared";
import type { UI } from "@/shared";

import Print from "./Print.vue";
import Share from "./Share.vue";

defineProps<{ puzzles: UI.Puzzle[] }>();

const { folders, selected, select, create, rename, remove } = useFolders();
const name = ref("");

watch(selected, (folder) => (name.value = folder.name), { immediate: true });
</script>

<template>
	<div class="folders">
		<ul class="tree-view">
			<li
				v-for="folder in folders"
				:key="folder.id"
			>
				<a
					href="#"
					:aria-current="folder.id === selected.id"
					@click.prevent="select(folder.id)"
				>
					{{ folder.name }} ({{ folder.puzzles.length }})
				</a>
			</li>
		</ul>
		<form
			class="field-row"
			@submit.prevent="rename({ id: selected.id, name: name.trim() || selected.name })"
		>
			<input
				v-model="name"
				type="text"
				aria-label="Folder name"
			/>
			<button>Rename</button>
		</form>
		<div class="actions">
			<button
				type="button"
				@click="create('New folder')"
			>
				New folder
			</button>
			<button
				type="button"
				@click="remove(selected.id)"
			>
				Delete
			</button>
		</div>
		<Print
			:puzzles
			:title="selected.name"
		>
			<Share :ids="selected.puzzles" />
		</Print>
	</div>
</template>

<style lang="css" scoped>
.folders {
	display: flex;
	flex-direction: column;
	gap: 10px;
	min-height: 0;
}

.tree-view {
	flex: 1 1 0;
	min-height: 80px;
	overflow-y: auto;
}

.tree-view a[aria-current="true"] {
	font-weight: bold;
	font-style: italic;
}

.field-row {
	margin: 0;
}

.field-row input {
	flex: 1;
	min-width: 0;
}

.actions {
	display: flex;
	gap: 10px;
}

.actions > * {
	flex: 1;
}
</style>
