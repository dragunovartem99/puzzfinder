<script setup lang="ts">
defineProps<{
	shortcut: {
		icon: string;
		label: string;
		link?: string;
	};
}>();
</script>

<template>
	<a :href="shortcut.link" target="_blank">
		<img :src="shortcut.icon" />
		<p>{{ shortcut.label }}</p>
	</a>
</template>

<style scoped>
a {
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	text-decoration: none;
	gap: 15px;
	padding-block: 10px;
}
img {
	width: 32px;
}
p {
	color: white;
	text-align: center;
	font-size: 14px;
	margin: 0;
}
</style>
