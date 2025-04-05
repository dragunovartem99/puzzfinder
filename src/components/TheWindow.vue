<script setup lang="ts">
import { computed, ref } from "vue";
import { results } from "../state/results.ts";

import TheForm from "./TheForm/TheForm.vue";
import ThePuzzle from "./ThePuzzle.vue";
import TheGitHub from "./TheGitHub.vue";

const emit = defineEmits(["close-clicked"]);

const tabs = ref([
	{ text: "Results", isSelected: true },
	{ text: "Favorites", isSelected: false },
	{ text: "GitHub", isSelected: false },
]);

function openTab(tab: any) {
	tabs.value.forEach((tab) => (tab.isSelected = false));
	tab.isSelected = true;
}

const selectedTab = computed(() => tabs.value.find((tab) => tab.isSelected)!.text);
</script>

<template>
	<main class="window">
		<div class="title-bar">
			<div class="title-bar-text">
				<img
					src="/logo.png"
					style="width: 15px; transform: scale(1.1); margin-right: 2px"
				/>
				Puzzfinder
			</div>
			<div class="title-bar-controls">
				<button @click="emit('close-clicked')" aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body scroll">
			<section>
				<p>
					Find hidden treasures in Lichess' multi-million puzzle database using filters.
				</p>
				<p>Diagrams: "Smart" (1992) by Christoph Wirth.</p>
			</section>
			<section>
				<TheForm />
			</section>
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
		</div>
	</main>
</template>

<style scoped>
main.window {
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

.scroll {
	overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scroll::-webkit-scrollbar {
    display: none;
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
