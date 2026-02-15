<script setup lang="ts">
import { computed, ref } from "vue";
import { usePuzzles } from "../state";

import { TheProgress, TheWindow } from "@/shared/components";

import MainWindowAbout from "./MainWindowAbout.vue";
import MainWindowForm from "./MainWindowForm.vue";
import MainWindowPagination from "./MainWindowPagination.vue";
import MainWindowPuzzles from "./MainWindowPuzzles.vue";
import MainWindowSource from "./MainWindowSource.vue";

type Tab = {
	text: string;
	isSelected: boolean;
};

const emit = defineEmits<{
	"close-main-window": [];
}>();

const { isLoading } = usePuzzles();

const tabs = ref<Tab[]>([
	{ text: "Results", isSelected: true },
	{ text: "Source", isSelected: false },
]);

const selectedTab = computed(() => tabs.value.find((tab) => tab.isSelected)?.text);

function openTab(tab: Tab) {
	tabs.value.forEach((tab) => (tab.isSelected = false));
	tab.isSelected = true;
}
</script>

<template>
	<TheWindow
		class="main-window"
		@close-clicked="emit('close-main-window')"
	>
		<template #title>
			<div class="title-bar-text">
				<img
					class="main-window__logo"
					src="/logo.png"
				/>
				Puzzfinder
			</div>
		</template>
		<template #body>
			<section>
				<MainWindowAbout />
			</section>
			<section>
				<MainWindowForm />
			</section>
			<section>
				<menu role="tablist">
					<li
						v-for="tab of tabs"
						:key="tab.text"
						:aria-selected="tab.isSelected"
						role="tab"
						@click="openTab(tab)"
					>
						<a>{{ tab.text }}</a>
					</li>
				</menu>
				<div
					class="window"
					role="tabpanel"
				>
					<div class="window-body">
						<template v-if="selectedTab === 'Results'">
							<TheProgress v-if="isLoading" />
							<MainWindowPuzzles />
						</template>
						<MainWindowSource v-if="selectedTab === 'Source'" />
					</div>
				</div>
			</section>
		</template>
		<template #status>
			<MainWindowPagination />
		</template>
	</TheWindow>
</template>

<style scoped>
.main-window {
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

.main-window__logo {
	width: 15px;
	transform: scale(1.1);
	margin-right: 2px;
}

.status-bar-field {
	flex: 1;
}

section + section {
	margin-top: 20px;
}
</style>
