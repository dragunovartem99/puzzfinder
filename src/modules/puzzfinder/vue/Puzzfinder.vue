<script setup lang="ts">
import { type UI, Window, Tabs } from "@/shared";
import { ref } from "vue";
import GitHub from "./GitHub.vue";
import Search from "./Search.vue";
import Puzzles from "./Puzzles.vue";
import { usePagination } from "../state";

const emit = defineEmits<{
	close: [];
}>();

const PUZZFINDER_WINDOW: UI.Window = {
	title: "Puzzfinder",
	controls: { close: true },
};

const TABS: UI.Tab[] = [
	{
		id: "puzzles",
		label: "Puzzles",
	},
	{
		id: "github",
		label: "GitHub",
	},
];

const { state: pagination } = usePagination();

const activeTab = ref<UI.Tab>(TABS[0]!);
</script>

<template>
	<Window
		@close="emit('close')"
		:window="PUZZFINDER_WINDOW"
	>
		<p>
			<b>Discover hidden gems</b> in Lichess'
			<a
				href="https://database.lichess.org/#puzzles"
				target="_blank"
			>
				multi-million puzzle database
			</a>
			with fast, filter-based searches.
		</p>
		<p>Chessboards: "Smart" (1992) by <b>Christoph Wirth</b>.</p>

		<Search class="search" />

		<Tabs
			:tabs="TABS"
			:active-tab
			@tab-select="(tab) => (activeTab = tab)"
		>
			<Puzzles v-if="activeTab?.id === 'puzzles'" />
			<GitHub v-if="activeTab?.id === 'github'" />
		</Tabs>

		<template
			#status-bar
			v-if="pagination"
		>
			<span><b>Results:</b> {{ pagination.total }}</span>
			<span><b>Page:</b> {{ pagination.page }} of {{ pagination.totalPages }}</span>
		</template>
	</Window>
</template>

<style scoped>
.search {
	margin-bottom: 15px;
}
</style>
