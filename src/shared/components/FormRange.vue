<script setup lang="ts">
import type { RangeFilter } from "../types";

import { ref, watch } from "vue";
import { getRawClone } from "../utils";

const props = defineProps<{
	range: RangeFilter;
	label: string;
	id: string;
}>();

const emit = defineEmits<{
	"update-range": [range: RangeFilter];
}>();

const model = ref(getRawClone(props.range));

const isExact = ref(false);

watch(model.value, () => {
	emit("update-range", model.value);
});

watch(isExact, () => {
	model.value = { equals: "", max: "", min: "" };
});
</script>

<template>
	<div class="form-control">
		<label>{{ label }}</label>
		<div class="range">
			<template v-if="!isExact">
				<input
					v-model="model.min"
					placeholder="Min"
					type="number"
				/>
				<input
					v-model="model.max"
					placeholder="Max"
					type="number"
				/>
			</template>
			<input
				v-else
				v-model="model.equals"
				placeholder="Equals"
				type="number"
			/>
			<input
				:id
				v-model="isExact"
				type="checkbox"
			/>
			<label :for="id">Exact</label>
		</div>
	</div>
</template>

<style scoped>
.range {
	display: flex;
	gap: 10px;
}
.range input[type="number"] {
	max-width: 100px;
}
</style>
