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
		@close="emit('close')"
		:window="PUZZFINDER_WINDOW"
	>
		<Description />

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
					class="loader-centered"
				/>
				<Puzzles
					v-else
					class="puzzles-scroll"
					:puzzles="uiPuzzles"
				/>
			</template>
			<GitHub v-if="activeTab.id === 'github'" />
		</Tabs>

		<template
			#status-bar
			v-if="puzzles?.pagination"
		>
			<span><b>Results:</b> {{ puzzles.pagination.total.toLocaleString() }}</span>
			<span>
				<b>Page:</b> {{ puzzles.pagination.page }} of
				{{ puzzles.pagination.totalPages.toLocaleString() }}
			</span>
			<span class="pages">
				<b>Navigate:</b>
				<a
					:class="{
						'disabled-link': puzzles.pagination.page === 1,
					}"
					href="#"
					@click.prevent="prevPage"
					>Prev</a
				>
				<a
					:class="{
						'disabled-link': puzzles.pagination.page === puzzles.pagination.totalPages,
					}"
					href="#"
					@click.prevent="nextPage"
					>Next</a
				>
			</span>
		</template>
	</Window>
</template>

<style scoped>
.search {
	margin-bottom: 15px;
}

.loader-centered {
	margin-block: auto;
}

.puzzles-scroll {
	overflow-y: auto;
	flex-grow: 1;
}

.pages {
	display: flex;
	gap: 10px;
}

.disabled-link {
	pointer-events: none;
	outline: none;
	color: var(--dialog-gray);
}
</style>
