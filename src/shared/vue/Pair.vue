<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
	<p>
		<b>{{ label }}</b>
		<span> <slot /> </span>
	</p>
</template>

<style lang="css" scoped>
p {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
}

span {
	flex-shrink: 0;
}
</style>
