<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { Loader, Pair, Tabs, Window, useFolders } from "@/shared";
import type { API, UI } from "@/shared";

import { queryPuzzles, queryPuzzlesByIds } from "../api";
import { mapPuzzle, parseShareHash } from "../map";
import { INITIAL_SEARCH, TABS } from "../static";
import About from "./About.vue";
import Favorites from "./Favorites.vue";
import Folders from "./Folders.vue";
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

const { isPending, isError, data: puzzles } = queryPuzzles(search);

function prevPage() {
	search.value.pagination.page--;
}

function nextPage() {
	search.value.pagination.page++;
}

const uiPuzzles = computed<UI.Puzzle[]>(() => {
	return puzzles.value?.data.map(mapPuzzle) ?? [];
});

const { folders, selected, importShared } = useFolders();

const folderIds = computed(() => selected.value.puzzles);
const folderQuery = queryPuzzlesByIds(folderIds);
// The query keeps its previous data while disabled, so an emptied folder must not show it
const folderPuzzles = computed(() =>
	folderIds.value.length > 0 ? (folderQuery.data.value?.map(mapPuzzle) ?? []) : []
);

const shared = parseShareHash(location.hash);
if (shared.length > 0) {
	importShared(shared);
	activeTab.value = TABS.find((tab) => tab.id === "favorites") ?? activeTab.value;
	history.replaceState(null, "", location.pathname + location.search);
}
</script>

<template>
	<Window
		class="puzzfinder"
		@close="emit('close')"
		:window="PUZZFINDER_WINDOW"
	>
		<Tabs
			class="main-tabs"
			:tabs="TABS"
			:active-tab
			@tab-select="(tab) => (activeTab = tab)"
		>
			<template v-if="activeTab.id === 'puzzles'">
				<Loader v-if="isPending" />
				<b v-else-if="isError">Failed to load puzzles, please try again</b>
				<b v-else-if="uiPuzzles.length === 0">No puzzles found</b>
				<Puzzles
					v-else
					class="puzzles-scroll"
					:puzzles="uiPuzzles"
				/>
			</template>
			<Favorites
				v-if="activeTab.id === 'favorites'"
				:folder="selected"
				:puzzles="folderPuzzles"
				:is-pending="folderQuery.isPending.value"
				:is-error="folderQuery.isError.value"
			/>
			<About v-if="activeTab.id === 'about'" />
			<GitHub v-if="activeTab.id === 'github'" />
		</Tabs>

		<Folders
			v-if="activeTab.id === 'favorites'"
			:puzzles="folderPuzzles"
		/>
		<Search
			v-show="activeTab.id !== 'favorites'"
			v-model="search"
		/>

		<template #status-bar>
			<template v-if="activeTab.id === 'favorites'">
				<Pair
					label="Puzzles:"
					class="status-bar-field"
				>
					{{ selected.puzzles.length }}
				</Pair>
				<Pair
					label="Folders:"
					class="status-bar-field"
				>
					{{ folders.length }}
				</Pair>
			</template>
			<p
				v-else-if="isPending"
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
	justify-content: center;
}

:deep(.puzzles-scroll) {
	flex: 1 1 0;
	min-height: 0;
	align-content: start;
	overflow-y: auto;
	scrollbar-width: none;
}

:deep(.puzzles-scroll::-webkit-scrollbar) {
	width: 0;
	height: 0;
}

.main-tabs {
	--flex-grow: 1;
}

@media (min-width: 768px) {
	.puzzfinder > :deep(.window-body) {
		display: grid;
		grid-template-columns: 1fr 260px;
		grid-template-rows: minmax(0, 1fr);
	}
}
</style>
