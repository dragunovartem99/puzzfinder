<script setup lang="ts">
import { ref } from "vue";
import { SORT_OPTIONS, THEMES } from "../static";
import { MultiSelect, Tabs } from "@/shared";
import type { API, UI } from "@/shared";

const model = defineModel<API.Search>({ required: true });

const sort = ref(SORT_OPTIONS[0]!.key);
const themes = ref<string[]>([]);

const SEARCH_TABS: UI.Tab[] = [
	{ id: "select", label: "Select" },
	{ id: "filter", label: "Filter" },
];

const activeTab = ref<UI.Tab>(SEARCH_TABS[0]!);

function submitForm() {
	const [field = "", order = ""] = sort.value.split("-");

	model.value.filters.themes = themes.value;
	model.value.sort = { field, order };
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
			<template v-if="activeTab.id === 'select'">
				<div class="field-row">
					<label for="themes">Themes</label>
					<MultiSelect
						id="themes"
						v-model="themes"
						:groups="THEMES"
					/>
				</div>
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
			</template>
			<template v-else-if="activeTab.id === 'filter'">
				<!-- Future filter functionality -->
			</template>
		</Tabs>
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
	height: 125px;
}

@media (min-width: 768px) {
	.search-tabs,
	.search-tabs :deep([role="tabpanel"]),
	.search-tabs :deep([role="tabpanel"] > .window-body) {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.search-tabs :deep(.field-row:first-of-type) {
		flex: 1;
		min-height: 0;
	}

	#themes {
		height: 100%;
	}
}
</style>
