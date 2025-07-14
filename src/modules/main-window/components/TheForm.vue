<script setup lang="ts">
import { search } from "../state/search.ts";
import { sumbitSearchForm } from "../utils/submitSearchForm";
import { puzzleThemes } from "../../../static/puzzleThemes";
import TheFormRange from "./TheFormRange.vue";

const ranges = [
	{
		control: { label: "Rating", id: "rating" },
		model: search.value.filters.rating,
	},
	{
		control: { label: "Moves number", id: "moves-number" },
		model: search.value.filters.movesNumber,
	},
	{
		control: { label: "Popularity", id: "popularity" },
		model: search.value.filters.popularity,
	},
	{
		control: { label: "Times played", id: "nb-plays" },
		model: search.value.filters.nbPlays,
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
	<form @submit.prevent="sumbitSearchForm">
		<div class="ranges">
			<TheFormRange v-for="{ model, control } of ranges" :model :control />
		</div>
		<div class="form-control">
			<label>Themes - use Ctrl or Shift</label>
			<select multiple size="10" v-model="search.filters.themes">
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
				<select v-model="search.sort">
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
