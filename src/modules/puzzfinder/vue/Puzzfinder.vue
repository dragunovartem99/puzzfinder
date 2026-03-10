<script setup lang="ts">
import { type API, type UI, Loader, Tabs, Window } from "@/shared";
import { computed, ref, watch } from "vue";

import { queryPuzzles } from "../api";
import { mapPuzzle } from "../map";
import { INITIAL_SEARCH, TABS } from "../static";

import About from "./About.vue";
import GitHub from "./GitHub.vue";
import Pagination from "./Pagination.vue";
import Puzzles from "./Puzzles.vue";
import Search from "./Search.vue";

const emit = defineEmits<{
	close: [];
}>();

const PUZZFINDER_WINDOW: UI.Window = {
	title: "Puzzfinder",
	controls: { close: true },
};

const activeTab = ref<UI.Tab>(TABS[0]!);

const search = ref<API.Search>(structuredClone(INITIAL_SEARCH));

watch(
	() => search.value.sort,
	() => (search.value.pagination.page = 1)
);

const { isPending, data: puzzles } = queryPuzzles(search);

function prevPage() {
	search.value.pagination.page--;
}

function nextPage() {
	search.value.pagination.page++;
}

const uiPuzzles = computed<UI.Puzzle[]>(() => {
	return puzzles.value?.data.map(mapPuzzle) ?? [];
});
</script>

<template>
	<Window
		class="puzzfinder"
		@close="emit('close')"
		:window="PUZZFINDER_WINDOW"
	>
		<Tabs
			:tabs="TABS"
			:active-tab
			@tab-select="(tab) => (activeTab = tab)"
		>
			<template v-if="activeTab.id === 'puzzles'">
				<Loader v-if="isPending" />
				<b v-else-if="uiPuzzles.length === 0"> No puzzles found </b>
				<Puzzles
					v-else
					class="puzzles-scroll"
					:puzzles="uiPuzzles"
				/>
			</template>
			<About v-if="activeTab.id === 'about'" />
			<GitHub v-if="activeTab.id === 'github'" />
		</Tabs>

		<Search v-model="search" />

		<template #status-bar>
			<p
				v-if="isPending"
				class="status-bar-field"
			>
				Loading, please wait...
			</p>
			<Pagination
				v-else-if="puzzles?.pagination"
				:pagination="puzzles.pagination"
				@prev="prevPage"
				@next="nextPage"
			/>
		</template>
	</Window>
</template>

<style lang="css" scoped>
.puzzfinder > :deep(.window-body) {
	justify-content: space-between;
	overflow: hidden;
	flex-grow: 1;
	gap: 15px;
	padding-block: 5px;
}

.status-bar-field {
	text-align: center;
}

.puzzles-scroll {
	overflow-y: auto;
	scrollbar-width: none;
}

.puzzles-scroll::-webkit-scrollbar {
	width: 0;
	height: 0;
}

@media (min-width: 768px) {
	.puzzfinder > :deep(.window-body) {
		display: grid;
		grid-template-columns: 1fr 260px;
	}
}
</style>
