<template>
	<form @submit.prevent>
		<div class="form-control">
			<label>Themes (hold Shift or Ctrl for multiple)</label>
			<select multiple size="5">
				<option>Mate in 1</option>
				<option>Mate in 2</option>
				<option>Mate in 3</option>
				<option>Mate in 4</option>
				<option>Mate in 5</option>
			</select>
		</div>
		<div class="form-control">
			<label>Order by</label>
			<select>
				<option>Highest rating</option>
				<option>Highest moves number</option>
				<option>Highest popularity</option>
				<option>Highest times played</option>
				<option>Lowest rating</option>
				<option>Lowest moves number</option>
				<option>Lowest popularity</option>
				<option>Lowest times played</option>
				<option>id (default)</option>
				<option>id (reversed)</option>
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
