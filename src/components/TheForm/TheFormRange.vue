<script setup lang="ts">
import { ref } from "vue";
import type { NumberRange } from "../../types/types";

defineProps<{ model: NumberRange; label: string; id: string }>();
const isExact = ref(false);
</script>

<template>
	<div class="form-control">
		<label>{{ label }}</label>
		<div class="range">
			<template v-if="!isExact">
				<input placeholder="Min" type="number" v-model="model.min" />
				<input placeholder="Max" type="number" v-model="model.max" />
			</template>
			<input v-else placeholder="Equals" type="number" v-model="model.equals" />
			<input :id type="checkbox" v-model="isExact" />
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
