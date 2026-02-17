<script setup lang="ts">
import type { SortOption } from "../types";

import { ref } from "vue";

import { FormRange } from "@/shared/components";
import { PUZZLE_THEMES } from "@/shared/constants";
import { getRawClone } from "@/shared/utils";
import type { SearchFiltersPayload } from "@/shared/types";

import { useSearchForm } from "../state";
import { submitForm } from "../actions";

const { searchForm } = useSearchForm();
const form = ref(getRawClone(searchForm));

const ranges: Array<{ label: string; key: keyof Omit<SearchFiltersPayload, "themes"> }> = [
	{ label: "Rating", key: "rating" },
	{ label: "Moves number", key: "movesNumber" },
	{ label: "Popularity", key: "popularity" },
	{ label: "Times played", key: "nbPlays" },
];

const sortOptions: Array<{ label: string; key: SortOption }> = [
	{ label: "Highest rating", key: "rating-desc" },
	{ label: "Highest moves number", key: "movesNumber-desc" },
	{ label: "Highest popularity", key: "popularity-desc" },
	{ label: "Highest times played", key: "nbPlays-desc" },
	{ label: "Lowest rating", key: "rating-asc" },
	{ label: "Lowest moves number", key: "movesNumber-asc" },
	{ label: "Lowest popularity", key: "popularity-asc" },
	{ label: "Lowest times played", key: "nbPlays-asc" },
	{ label: "Puzzle ID", key: "puzzleId-asc" },
	{ label: "Puzzle ID (reversed)", key: "puzzleId-desc" },
];
</script>

<template>
	<form
		class="main-window-form"
		@submit.prevent="submitForm(form)"
	>
		<div class="main-window-form__ranges">
			<FormRange
				v-for="{ label, key } of ranges"
				:id="key"
				:key
				:label
				:range="form.filters[key]"
				@update-range="(range) => (form.filters[key] = range)"
			/>
		</div>
		<div class="form-control">
			<label>Themes - use Ctrl or Shift</label>
			<select
				v-model="form.filters.themes"
				multiple
				size="10"
			>
				<optgroup
					v-for="group of PUZZLE_THEMES"
					:key="group.label"
					:label="group.label"
				>
					<option
						v-for="option of group.options"
						:key="option.value"
						:value="option.value"
					>
						{{ option.text }}
					</option>
				</optgroup>
			</select>
		</div>
		<div class="main-window-form__results">
			<div class="form-control">
				<label>Order by</label>
				<select v-model="form.sort">
					<option
						v-for="option in sortOptions"
						:key="option.key"
						:value="option.key"
					>
						{{ option.label }}
					</option>
				</select>
			</div>
			<button>Find</button>
		</div>
	</form>
</template>

<style scoped>
.main-window-form {
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

.main-window-form__ranges {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.main-window-form__results {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

button {
	margin-top: auto;
}
</style>
