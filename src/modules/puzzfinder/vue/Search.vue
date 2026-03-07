<script setup lang="ts">
import { ref } from "vue";
import { SORT_OPTIONS, THEMES } from "../static";
import { MultiSelect } from "@/shared";
import type { API } from "@/shared";

const model = defineModel<API.Search>({ required: true });

const sort = ref(SORT_OPTIONS[0]!.key);
const themes = ref<string[]>([]);

function submitForm() {
	const [field = "", order = ""] = sort.value.split("-");

	model.value.filters.themes = themes.value;
	model.value.sort = { field, order };
}
</script>

<template>
	<form @submit.prevent="submitForm">
		<section>
			<div class="field-row">
				<label for="themes">Themes</label>
				<MultiSelect
					id="themes"
					v-model="themes"
					:groups="THEMES"
					:size="12"
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
		</section>
		<button>Search</button>
	</form>
</template>

<style lang="css" scoped>
section {
	margin-bottom: 15px;
}

.field-row {
	display: flex;
	flex-direction: column;
	gap: var(--grouped-element-spacing);
	align-items: stretch;
}

.field-row label {
	font-weight: bold;
}
</style>
