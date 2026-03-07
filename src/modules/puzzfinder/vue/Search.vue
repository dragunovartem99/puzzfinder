<script setup lang="ts">
import { ref } from "vue";
import { SORT_OPTIONS } from "../static";
import type { API } from "@/shared";

const model = defineModel<API.Search>({ required: true });

const selectedOption = ref(SORT_OPTIONS[0]!.key);

function submitForm() {
	const [field = "", order = ""] = selectedOption.value.split("-");

	model.value.sort = { field, order };
}
</script>

<template>
	<form @submit.prevent="submitForm">
		<section>
			<div class="field-row">
				<label for="sort-options">Sort by</label>
				<select
					id="sort-options"
					v-model="selectedOption"
				>
					<option
						v-for="option in SORT_OPTIONS"
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
