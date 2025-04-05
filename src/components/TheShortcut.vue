<script setup lang="ts">
defineProps<{ icon: string; label: string, link?: string }>();
</script>

<template>
	<a :href="link" target="_blank">
		<img :src="icon">
		<p>{{ label }}</p>
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
