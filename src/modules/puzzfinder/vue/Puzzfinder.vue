<script setup lang="ts">
import { type API, Window, Tabs, type UI } from "@/shared";
import { computed, ref } from "vue";

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

const search = ref<Partial<API.Search>>({
	sort: {
		field: "",
		order: "",
	},
});

const { data: puzzles } = queryPuzzles(search);

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
			<Puzzles
				v-if="activeTab.id === 'puzzles'"
				:puzzles="uiPuzzles"
			/>
			<GitHub v-if="activeTab.id === 'github'" />
		</Tabs>

		<template
			#status-bar
			v-if="puzzles?.pagination"
		>
			<span><b>Results:</b> {{ puzzles.pagination.total }}</span>
			<span
				><b>Page:</b> {{ puzzles.pagination.page }} of
				{{ puzzles.pagination.totalPages }}</span
			>
		</template>
	</Window>
</template>

<style scoped>
.search {
	margin-bottom: 15px;
}
</style>
