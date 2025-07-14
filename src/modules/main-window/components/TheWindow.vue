<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { results } from "../state/results";
import { pagination } from "../state/pagination";

import { TheWindow } from "../../shared";
import TheDescription from "./TheDescription.vue";
import TheForm from "./TheForm.vue";
import ThePuzzle from "./ThePuzzle.vue";
import TheGitHub from "./TheGitHub.vue";

import { formatNumber } from "../../shared/utils/formatNumber";

const toggleMainWindow = inject<() => void>("toggle-main-window");

const tabs = ref([
	{ text: "Results", isSelected: true },
	{ text: "GitHub", isSelected: false },
]);

function openTab(tab: any) {
	tabs.value.forEach((tab) => (tab.isSelected = false));
	tab.isSelected = true;
}

const selectedTab = computed(() => tabs.value.find((tab) => tab.isSelected)!.text);

const paginationStatus = computed(() => {
	if (!pagination.value.totalPages) return;
	return `<b>Page:</b> ${pagination.value.page} of ${pagination.value.totalPages}`;
});
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
						<div class="results" v-if="selectedTab === 'Results'">
							<ThePuzzle v-for="puzzle of results" :puzzle :key="puzzle.puzzleId" />
						</div>
						<TheGitHub v-if="selectedTab === 'GitHub'" />
					</div>
				</div>
			</section>
		</template>
		<template #status>
			<p class="status-bar-field">
				<b>Results:</b> {{ formatNumber(pagination.total || 0) }}
			</p>
			<p class="status-bar-field" v-html="paginationStatus"></p>
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
