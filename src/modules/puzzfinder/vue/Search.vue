<script setup lang="ts">
import { searchPuzzles } from "../api";
import { usePagination, usePuzzles } from "../state";
import { ref } from "vue";
import { orderOptions } from "../static";

const selectedOption = ref(orderOptions[0]!.key);

async function submitForm() {
	const [field = "", order = ""] = selectedOption.value.split("-");

	const response = await searchPuzzles({
		sort: {
			field,
			order,
		},
	});

	if (response) {
		usePuzzles().setState(response.data);
		usePagination().setState(response.pagination);
	}
}
</script>

<template>
	<form @submit.prevent="submitForm">
		<section>
			<div class="field-row">
				<label for="order-select">Order by</label>
				<select
					id="order-select"
					v-model="selectedOption"
				>
					<option
						v-for="option in orderOptions"
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
