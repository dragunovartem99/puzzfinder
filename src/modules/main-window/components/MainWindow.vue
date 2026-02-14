<script setup lang="ts">
import { computed, ref } from "vue";
import { usePuzzles } from "../state/puzzles.ts";

import TheWindow from "@/shared/components/TheWindow.vue";
import ThePuzzle from "@/shared/components/ThePuzzle.vue";
import TheProgress from "@/shared/components/TheProgress.vue";

import MainWindowAbout from "./MainWindowAbout.vue";
import MainWindowForm from "./MainWindowForm.vue";
import MainWindowPages from "./MainWindowPages.vue";
import MainWindowSource from "./MainWindowSource.vue";

type Tab = { text: string; isSelected: boolean };

const emit = defineEmits<{ "close-main-window": [] }>();

const { puzzles, isLoading } = usePuzzles();

const tabs = ref<Tab[]>([
	{ text: "Results", isSelected: true },
	{ text: "Source", isSelected: false },
]);

function openTab(tab: Tab) {
	tabs.value.forEach((tab) => (tab.isSelected = false));
	tab.isSelected = true;
}

const selectedTab = computed(() => tabs.value.find((tab) => tab.isSelected)!.text);
</script>

<template>
	<TheWindow class="main" @close-clicked="emit('close-main-window')">
		<template #title>
			<div class="title-bar-text">
				<img
					src="/logo.png"
					style="width: 15px; transform: scale(1.1); margin-right: 2px"
				/>
				Puzzfinder
			</div>
		</template>
		<template #body>
			<section><MainWindowAbout /></section>
			<section><MainWindowForm /></section>
			<section>
				<menu role="tablist">
					<li
						v-for="tab of tabs"
						@click="openTab(tab)"
						:aria-selected="tab.isSelected"
						role="tab"
					>
						<a>{{ tab.text }}</a>
					</li>
				</menu>
				<div class="window" role="tabpanel">
					<div class="window-body">
						<TheProgress v-if="isLoading" />
						<div class="results" v-else-if="selectedTab === 'Results'">
							<ThePuzzle v-for="puzzle of puzzles" :puzzle :key="puzzle.puzzleId" />
						</div>
						<MainWindowSource v-if="selectedTab === 'Source'" />
					</div>
				</div>
			</section>
		</template>
		<template #status>
			<MainWindowPages />
		</template>
	</TheWindow>
</template>

<style scoped>
.main {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-width: 1000px;
	width: calc(100% - 20px);
	max-height: calc(100% - 20px);
	display: flex;
	flex-direction: column;
}

.status-bar-field {
	flex: 1;
}

.results {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
}

section + section {
	margin-top: 20px;
}
</style>
