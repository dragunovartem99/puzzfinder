<script setup lang="ts">
import { type API, type UI, Loader, Tabs, Window } from "@/shared";
import { computed, ref, watch } from "vue";

import { queryPuzzles } from "../api";
import { mapPuzzle } from "../map";
import { TABS } from "../static";

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

const search = ref<API.Search>({
	filters: {
		themes: [],
	},
	sort: {
		field: "rating",
		order: "desc",
	},
	pagination: {
		page: 1,
		limit: 12,
	},
});

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
		<Search
			class="search"
			v-model="search"
		/>

		<Tabs
			class="tabs"
			:tabs="TABS"
			:active-tab
			@tab-select="(tab) => (activeTab = tab)"
		>
			<template v-if="activeTab.id === 'puzzles'">
				<Loader
					v-if="isPending"
					class="centered"
				/>
				<b
					v-else-if="uiPuzzles.length === 0"
					class="centered"
				>
					No puzzles found
				</b>
				<Puzzles
					v-else
					class="puzzles-scroll"
					:puzzles="uiPuzzles"
				/>
			</template>
			<About v-if="activeTab.id === 'about'" />
			<GitHub v-if="activeTab.id === 'github'" />
		</Tabs>

		<template #status-bar>
			<p
				v-if="isPending"
				class="status-bar-field centered"
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
	display: grid;
	gap: 15px;
}

@media (min-width: 768px) {
	.puzzfinder > :deep(.window-body) {
		padding: 5px;
		grid-template-columns: 300px 1fr;
	}
}

.tabs {
	display: flex;
	flex-direction: column;
	min-height: 0;
}

.tabs :deep([role="tabpanel"]) {
	flex-grow: 1;
	min-height: 0;
	display: flex;
	flex-direction: column;
}

.tabs :deep([role="tabpanel"] > .window-body) {
	flex-grow: 1;
	min-height: 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.centered {
	margin-block: auto;
	text-align: center;
}

.puzzles-scroll {
	overflow-y: auto;
	flex-grow: 1;
	min-height: 0;
	scrollbar-width: none;
}

.puzzles-scroll::-webkit-scrollbar {
	width: 0;
	height: 0;
}
</style>
