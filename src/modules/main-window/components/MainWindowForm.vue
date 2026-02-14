<script setup lang="ts">
import type { SortOption } from "../types";
import type { ApiRange } from "@/shared/types";

import { ref } from "vue";

import FormRange from "@/shared/components/FormRange.vue";
import { PUZZLE_THEMES } from "@/shared/constants";
import { getRawClone } from "@/shared/utils";

import { useSearchForm } from "../state";
import { submitForm } from "../actions";

const { searchForm } = useSearchForm();
const form = ref(getRawClone(searchForm));

const ranges: Array<{ control: { label: string; id: string }; model: Partial<ApiRange> }> = [
	{
		control: { label: "Rating", id: "rating" },
		model: form.value.filters.rating,
	},
	{
		control: { label: "Moves number", id: "moves-number" },
		model: form.value.filters.movesNumber,
	},
	{
		control: { label: "Popularity", id: "popularity" },
		model: form.value.filters.popularity,
	},
	{
		control: { label: "Times played", id: "nb-plays" },
		model: form.value.filters.nbPlays,
	},
];

const sortOptions: Array<{ value: SortOption; text: string }> = [
	{ value: "rating-desc", text: "Highest rating" },
	{ value: "movesNumber-desc", text: "Highest moves number" },
	{ value: "popularity-desc", text: "Highest popularity" },
	{ value: "nbPlays-desc", text: "Highest times played" },
	{ value: "rating-asc", text: "Lowest rating" },
	{ value: "movesNumber-asc", text: "Lowest moves number" },
	{ value: "popularity-asc", text: "Lowest popularity" },
	{ value: "nbPlays-asc", text: "Lowest times played" },
	{ value: "puzzleId-asc", text: "Puzzle ID" },
	{ value: "puzzleId-desc", text: "Puzzle ID (reversed)" },
];
</script>

<template>
	<form @submit.prevent="submitForm(form)">
		<div class="ranges">
			<FormRange
				v-for="{ model, control } of ranges"
				:model
				:control
			/>
		</div>
		<div class="form-control">
			<label>Themes - use Ctrl or Shift</label>
			<select
				multiple
				size="10"
				v-model="form.filters.themes"
			>
				<optgroup
					v-for="group of PUZZLE_THEMES"
					:label="group.label"
				>
					<option
						v-for="option of group.options"
						:value="option.value"
					>
						{{ option.text }}
					</option>
				</optgroup>
			</select>
		</div>
		<div class="results">
			<div class="form-control">
				<label>Order by</label>
				<select v-model="form.sort">
					<option
						v-for="option in sortOptions"
						:value="option.value"
					>
						{{ option.text }}
					</option>
				</select>
			</div>
			<button>Find</button>
		</div>
	</form>
</template>

<style scoped>
form {
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
.ranges {
	display: flex;
	flex-direction: column;
	gap: 15px;
}
.results {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
button {
	margin-top: auto;
}
</style>
