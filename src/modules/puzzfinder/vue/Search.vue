<script setup lang="ts">
import { ref } from "vue";
import { SORT_OPTIONS, THEMES } from "../static";
import { MultiSelect, Tabs } from "@/shared";
import type { API, UI } from "@/shared";

import Filters from "./Filters.vue";

const model = defineModel<API.Search>({ required: true });

const sort = ref(SORT_OPTIONS[0]!.key);
const themes = ref<string[]>([]);
const rating = ref<API.Range>({});
const movesNumber = ref<API.Range>({});

const SEARCH_TABS: UI.Tab[] = [
	{ id: "themes", label: "Themes" },
	{ id: "filters", label: "Filters" },
];

const activeTab = ref<UI.Tab>(SEARCH_TABS[0]!);

function submitForm() {
	const [field = "", order = ""] = sort.value.split("-");

	model.value.sort = { field, order };
	model.value.filters.themes = themes.value;
	model.value.filters.rating = rating.value;
	model.value.filters.movesNumber = movesNumber.value;
}
</script>

<template>
	<form @submit.prevent="submitForm">
		<Tabs
			class="search-tabs"
			:tabs="SEARCH_TABS"
			:active-tab
			@tab-select="(tab) => (activeTab = tab)"
		>
			<template v-if="activeTab.id === 'themes'">
				<MultiSelect
					id="themes"
					v-model="themes"
					:groups="THEMES"
				/>
			</template>
			<template v-else-if="activeTab.id === 'filters'">
				<Filters
					v-model:rating="rating"
					v-model:moves-number="movesNumber"
				/>
			</template>
		</Tabs>
		<div class="field-row">
			<label for="sort-options">Sort by</label>
			<select
				id="sort-options"
				v-model="sort"
			>
				<option
					v-for="option in SORT_OPTIONS"
					:key="option.key"
					:value="option.key"
				>
					{{ option.label }}
				</option>
			</select>
		</div>
		<button>Search</button>
	</form>
</template>

<style lang="css" scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

button {
	margin-top: auto;
}

.field-row {
	display: flex;
	flex-direction: column;
	gap: var(--grouped-element-spacing);
	align-items: stretch;
	margin: 0;
}

.field-row label {
	font-weight: bold;
}

#themes {
	width: 100%;
	flex-grow: 1;
	min-height: 127px;
}

@media (min-width: 768px) {
	.search-tabs {
		--flex-grow: 1;
	}
}
</style>
