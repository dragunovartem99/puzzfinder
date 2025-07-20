<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { results, isLoading } from "../state/results.ts";

import TheWindow from "@/shared/components/TheWindow.vue";
import TheDescription from "./TheDescription.vue";
import TheForm from "./TheForm.vue";
import ThePuzzle from "./ThePuzzle.vue";
import TheGitHub from "./TheGitHub.vue";
import ThePagination from "./ThePagination.vue";

const toggleMainWindow = inject<() => void>("toggle-main-window");

type Tab = { text: string; isSelected: boolean };

const tabs = ref<Tab[]>([
	{ text: "Results", isSelected: true },
	{ text: "GitHub", isSelected: false },
]);

function openTab(tab: Tab) {
	tabs.value.forEach((tab) => (tab.isSelected = false));
	tab.isSelected = true;
}

const selectedTab = computed(() => tabs.value.find((tab) => tab.isSelected)!.text);
</script>

<template>
	<TheWindow class="main" @close-clicked="toggleMainWindow">
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
			<section><TheDescription /></section>
			<section><TheForm /></section>
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
						<template v-if="isLoading">
							<div class="progress-indicator segmented">
								<span class="progress-indicator-bar" style="width: 20%" />
							</div>
						</template>
						<div class="results" v-else-if="selectedTab === 'Results'">
							<ThePuzzle v-for="puzzle of results" :puzzle :key="puzzle.puzzleId" />
						</div>
						<TheGitHub v-if="selectedTab === 'GitHub'" />
					</div>
				</div>
			</section>
		</template>
		<template #status>
			<ThePagination />
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
