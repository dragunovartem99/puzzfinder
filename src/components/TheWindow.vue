<script setup lang="ts">
import { computed, ref } from "vue";
import TheForm from "./TheForm.vue";
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
		<div class="window-body">
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
						<TheGitHub v-if="selectedTab === 'GitHub'"/>
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
	width: calc(100% - 20px);
	max-width: 800px;
}
section + section {
	margin-top: 20px;
}
</style>
