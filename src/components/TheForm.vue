<script setup lang="ts">
import { findPuzzles } from "../api/findPuzzles.ts";
import { formToPayload } from "../utils/formToPayload.ts";

function handleSubmit(event) {
	findPuzzles(formToPayload(event.target));
}
</script>
<template>
	<form @submit.prevent="handleSubmit">
		<div class="form-control">
			<label>Themes (hold Shift or Ctrl for multiple)</label>
			<select name="themes" multiple size="5">
				<option value="mateIn1">Mate in 1</option>
				<option value="mateIn2">Mate in 2</option>
				<option value="mateIn3">Mate in 3</option>
				<option value="mateIn4">Mate in 4</option>
				<option value="mateIn5">Mate in 5</option>
			</select>
		</div>
		<div class="form-control">
			<label>Order by</label>
			<select name="orderBy">
				<option value="rating-desc">Highest rating</option>
				<option value="moveNumber-desc">Highest moves number</option>
				<option value="popularity-desc">Highest popularity</option>
				<option value="nbPlays-desc">Highest times played</option>
				<option value="rating-asc">Lowest rating</option>
				<option value="movesNumber-asc">Lowest moves number</option>
				<option value="popularity-asc">Lowest popularity</option>
				<option value="nbPlays-asc">Lowest times played</option>
				<option value="id-asc">id (default)</option>
				<option value="id-desc">id (reversed)</option>
			</select>
		</div>
		<button>Find</button>
	</form>
</template>

<style>
.form-control {
	display: flex;
	flex-direction: column;
	gap: 5px;
	max-width: 300px;
}
.form-control label {
	font-weight: bold;
}
.form-control + .form-control {
	margin-top: 15px;
}
</style>
