<script setup lang="ts">
import { search } from "../../state/search.ts";
import { sumbitSearchForm } from "../../actions/submitSearchForm";
import { puzzleThemes } from "../../static/puzzleThemes.ts";
import TheFormRange from "./TheFormRange.vue";
</script>

<template>
	<form @submit.prevent="sumbitSearchForm">
		<div class="ranges">
			<TheFormRange :model="search.filters.rating" label="Rating" :id="'rating'" />
			<TheFormRange
				:model="search.filters.movesNumber"
				label="Moves number"
				id="moves-number"
			/>
			<TheFormRange :model="search.filters.popularity" label="Popularity" id="popularity" />
			<TheFormRange :model="search.filters.nbPlays" label="Times played" id="nb-plays" />
		</div>
		<div class="form-control">
			<label>Themes - use Ctrl or Shift</label>
			<select multiple size="10" v-model="search.filters.themes">
				<option v-for="theme of puzzleThemes" :value="theme.value">
					{{ theme.text }}
				</option>
			</select>
		</div>
		<div class="results">
			<div class="form-control">
				<label>Order by</label>
				<select v-model="search.sort">
					<option value="rating-desc">Highest rating</option>
					<option value="movesNumber-desc">Highest moves number</option>
					<option value="popularity-desc">Highest popularity</option>
					<option value="nbPlays-desc">Highest times played</option>
					<option value="rating-asc">Lowest rating</option>
					<option value="movesNumber-asc">Lowest moves number</option>
					<option value="popularity-asc">Lowest popularity</option>
					<option value="nbPlays-asc">Lowest times played</option>
					<option value="puzzleId-asc">Puzzle ID</option>
					<option value="puzzleId-desc">Puzzle ID (reversed)</option>
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
