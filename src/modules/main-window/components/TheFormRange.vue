<script setup lang="ts">
import { ref, watch } from "vue";
import type { NumberRange } from "../../types";

const props = defineProps<{
	model: Partial<NumberRange>;
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
				<input placeholder="Min" type="number" v-model="model.min" />
				<input placeholder="Max" type="number" v-model="model.max" />
			</template>
			<input v-else placeholder="Equals" type="number" v-model="model.equals" />
			<input :id="control.id" type="checkbox" v-model="isExact" />
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
