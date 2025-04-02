<script setup lang="ts">
import { search } from "../state/search.ts";
import { sumbitSearchForm } from "../actions/submitSearchForm";
import { puzzleThemes } from "../static/puzzleThemes.ts";
</script>

<template>
	<form @submit.prevent="sumbitSearchForm">
		<div class="controls">
			<div class="form-control">
				<label>Themes - use Ctrl or Shift</label>
				<select multiple size="5" v-model="search.filters.themes">
					<option v-for="theme of puzzleThemes" :value="theme.value">
						{{ theme.text }}
					</option>
				</select>
			</div>
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
		</div>
		<button>Find</button>
	</form>
</template>

<style>
.controls {
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
	align-items: start;
	flex-wrap: wrap;
}
.form-control {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.form-control label {
	font-weight: bold;
}
</style>
