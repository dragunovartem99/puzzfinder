<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { Loader, Tabs, Window, useFavorites } from "@/shared";
import type { API, UI } from "@/shared";

import { queryPuzzles } from "../api";
import { mapPuzzle } from "../map";
import { INITIAL_SEARCH, TABS } from "../static";
import About from "./About.vue";
import GitHub from "./GitHub.vue";
import Pagination from "./Pagination.vue";
import Print from "./Print.vue";
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

const FAVORITES_PER_PAGE = 12;

const { favorites } = useFavorites();
const requestedFavoritesPage = ref(1);

const favoritesPagination = computed<API.Pagination>(() => {
	const totalPages = Math.max(1, Math.ceil(favorites.value.length / FAVORITES_PER_PAGE));

	return {
		limit: FAVORITES_PER_PAGE,
		total: favorites.value.length,
		totalPages,
		page: Math.min(requestedFavoritesPage.value, totalPages),
	};
});

const favoritesOnPage = computed(() => {
	const start = (favoritesPagination.value.page - 1) * FAVORITES_PER_PAGE;
	return favorites.value.slice(start, start + FAVORITES_PER_PAGE);
});

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
			class="main-tabs"
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
			<template v-if="activeTab.id === 'favorites'">
				<b v-if="favorites.length === 0"
					>Press the heart button on a puzzle to add it here</b
				>
				<template v-else>
					<Puzzles
						class="puzzles-scroll"
						:puzzles="favoritesOnPage"
					/>
					<Print />
				</template>
			</template>
			<About v-if="activeTab.id === 'about'" />
			<GitHub v-if="activeTab.id === 'github'" />
		</Tabs>

		<Search v-model="search" />

		<template #status-bar>
			<Pagination
				v-if="activeTab.id === 'favorites'"
				:pagination="favoritesPagination"
				@prev="requestedFavoritesPage = favoritesPagination.page - 1"
				@next="requestedFavoritesPage = favoritesPagination.page + 1"
			/>
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
}

.puzzles-scroll {
	flex: 1 1 0;
	min-height: 0;
	align-content: start;
	overflow-y: auto;
	scrollbar-width: none;
}

.puzzles-scroll::-webkit-scrollbar {
	width: 0;
	height: 0;
}

@media (min-width: 768px) {
	.main-tabs {
		--flex-grow: 1;
	}

	.puzzfinder > :deep(.window-body) {
		display: grid;
		grid-template-columns: 1fr 260px;
		grid-template-rows: minmax(0, 1fr);
	}
}
</style>
