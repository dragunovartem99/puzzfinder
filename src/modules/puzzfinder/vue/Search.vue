<script setup lang="ts">
import { ref } from "vue";
import { ORDER_OPTIONS } from "../static";
import type { API } from "@/shared";

const model = defineModel<Partial<API.Search>>({ required: true });

const selectedOption = ref(ORDER_OPTIONS[0]!.key);

function submitForm() {
	const [field = "", order = ""] = selectedOption.value.split("-");

	model.value.sort = { field, order };
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
						v-for="option in ORDER_OPTIONS"
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
