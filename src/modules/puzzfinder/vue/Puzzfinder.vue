<script setup lang="ts">
import { type API, type UI, Loader, Tabs, Window } from "@/shared";
import { computed, ref, watch } from "vue";

import { queryPuzzles } from "../api";
import { mapPuzzle } from "../map";
import { TABS } from "../static";

import GitHub from "./GitHub.vue";
import Search from "./Search.vue";
import Puzzles from "./Puzzles.vue";
import Description from "./Description.vue";
import Pagination from "./Pagination.vue";

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

const pagination = computed(() => puzzles.value?.pagination ?? null);
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
			:tabs="TABS"
			:active-tab
			@tab-select="(tab) => (activeTab = tab)"
		>
			<template v-if="activeTab.id === 'puzzles'">
				<Loader
					v-if="isPending"
					class="centered"
				/>
				<span
					v-else-if="uiPuzzles.length === 0"
					class="centered"
				>
					No puzzles found
				</span>
				<Puzzles
					v-else
					class="puzzles-scroll"
					:puzzles="uiPuzzles"
				/>
			</template>
			<GitHub v-if="activeTab.id === 'github'" />
			<Description v-if="activeTab.id === 'description'" />
		</Tabs>

		<template #status-bar>
			<p
				v-if="isPending"
				class="status-bar-field centered"
			>
				Loading, please wait...
			</p>
			<Pagination
				v-else-if="pagination"
				:pagination="pagination"
				@prev="prevPage"
				@next="nextPage"
			/>
		</template>
	</Window>
</template>

<style lang="css" scoped>
.puzzfinder > :deep(.window-body) {
	padding: 5px;
	display: grid;
	grid-template-columns: 300px 1fr;
	gap: 15px;
}

.centered {
	margin-block: auto;
	text-align: center;
}

.puzzles-scroll {
	overflow-y: auto;
	flex-grow: 1;
}
</style>
