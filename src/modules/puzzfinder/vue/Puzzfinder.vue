<script setup lang="ts">
import { type UI, Window, Tabs } from "@/shared";
import { ref } from "vue";
import GitHub from "./GitHub.vue";
import Search from "./Search.vue";
import Puzzles from "./Puzzles.vue";

const emit = defineEmits<{
	close: [];
}>();

const PUZZFINDER_WINDOW: UI.Window = {
	id: "puzzfinder",
	title: "Puzzfinder",
	controls: { close: true },
	statusBar: [],
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

		<Search />

		<hr />

		<Tabs
			:tabs="TABS"
			:active-tab
			@tab-select="(tab) => (activeTab = tab)"
		>
			<Puzzles v-if="activeTab?.id === 'puzzles'" />
			<GitHub v-if="activeTab?.id === 'github'" />
		</Tabs>
	</Window>
</template>
