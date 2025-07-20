<script setup lang="ts">
import FormRange from "./FormRange.vue";

import { cloneRef } from "@/shared/utils/cloneRef.ts";
import { puzzleThemes } from "../static/puzzleThemes.ts";

import { useSearch } from "../state/search.ts";
import { submitForm } from "../usecases/search.ts";

const { search } = useSearch();
const form = cloneRef(search);

function handleSubmit() {
	submitForm(cloneRef(form));
}

const ranges = [
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

const sortOptions = [
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
	<form @submit.prevent="handleSubmit">
		<div class="ranges">
			<FormRange v-for="{ model, control } of ranges" :model :control />
		</div>
		<div class="form-control">
			<label>Themes - use Ctrl or Shift</label>
			<select multiple size="10" v-model="form.filters.themes">
				<optgroup v-for="group of puzzleThemes" :label="group.label">
					<option v-for="option of group.options" :value="option.value">
						{{ option.text }}
					</option>
				</optgroup>
			</select>
		</div>
		<div class="results">
			<div class="form-control">
				<label>Order by</label>
				<select v-model="form.sort">
					<option v-for="option in sortOptions" :value="option.value">
						{{ option.text }}
					</option>
				</select>
			</div>
			<button>Find</button>
		</div>
	</form>
</template>

<style>
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
