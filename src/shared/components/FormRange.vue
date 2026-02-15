<script setup lang="ts">
import { ref, watch } from "vue";
import type { RangeFilter } from "../types";

const props = defineProps<{
	model: Partial<RangeFilter>;
	control: { label: string; id: string };
}>();

const isExact = ref(false);

watch(isExact, () => {
	props.model.min = undefined;
	props.model.max = undefined;
	props.model.equals = undefined;
});
</script>

<template>
	<div class="form-control">
		<label>{{ control.label }}</label>
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
				:id="control.id"
				v-model="isExact"
				type="checkbox"
			/>
			<label :for="control.id">Exact</label>
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
