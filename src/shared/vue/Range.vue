<script setup lang="ts">
import { ref } from "vue";
import type { API } from "@/shared";

defineProps<{ label: string }>();

const model = defineModel<API.Range>({ required: true });

const isExact = ref(false);

const min = ref<number | "">("");
const max = ref<number | "">("");
const equals = ref<number | "">("");

function onModeChange() {
	isExact.value = !isExact.value;

	min.value = max.value = equals.value = "";

	model.value = {};
}

function onRangeInput() {
	const range: API.Range = {};

	if (min.value) range.min = min.value;
	if (max.value) range.max = max.value;

	model.value = range;
}

function onExactInput() {
	model.value = {};

	if (equals.value) model.value = { equals: equals.value };
}
</script>

<template>
	<div class="range">
		<div class="range-header">
			<b>{{ label }}</b>
			<input
				:id="label"
				type="checkbox"
				:checked="isExact"
				@change="onModeChange"
			/>
			<label :for="label"> Exact </label>
		</div>
		<div
			v-if="!isExact"
			class="range-inputs"
		>
			<input
				type="number"
				v-model="min"
				placeholder="Min"
				@input="onRangeInput"
			/>
			<input
				type="number"
				v-model="max"
				placeholder="Max"
				@input="onRangeInput"
			/>
		</div>
		<input
			v-else
			type="number"
			v-model="equals"
			@input="onExactInput"
		/>
	</div>
</template>

<style lang="css" scoped>
.range {
	display: flex;
	flex-direction: column;
	gap: var(--grouped-element-spacing);
}

.range-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.range-inputs {
	display: flex;
	gap: var(--grouped-element-spacing);
}

.range-inputs input {
	flex: 1;
	min-width: 0;
}
</style>
