<script setup lang="ts">
import type { UI } from "@/shared";

defineProps<{
	groups: UI.OptionGroup[];
	size?: number;
}>();

const model = defineModel<string[]>({ required: true });

function onChange(event: Event) {
	if (!(event.target instanceof HTMLSelectElement)) return;

	model.value = Array.from(event.target.selectedOptions).map((o) => o.value);
}
</script>

<template>
	<select
		multiple
		:size="size"
		@change="onChange"
	>
		<optgroup
			v-for="group in groups"
			:key="group.label"
			:label="group.label"
		>
			<option
				v-for="option in group.options"
				:key="option.key"
				:value="option.key"
				:selected="model.includes(option.key)"
			>
				{{ option.label }}
			</option>
		</optgroup>
	</select>
</template>

<style lang="css" scoped>
select {
	height: auto;
	padding-right: 0;
	background-image: none;
}

select:focus {
	color: #000;
	background-color: #fff;
}
</style>
