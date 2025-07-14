<script setup lang="ts">
const components = [
	{
		link: "https://github.com/dragunovartem99/puzzfinder",
		text: "Client-side web interface",
	},
	{
		link: "https://github.com/dragunovartem99/puzzfinder-api",
		text: "Application programming interface",
	},
	{
		link: "https://github.com/dragunovartem99/puzzfinder-db",
		text: "SQLite database with chess puzzles",
	},
];
</script>

<template>
	<p>The project consists of three components:</p>
	<ul>
		<li v-for="component of components">
			<a :href="component.link" target="_blank"> {{ component.text }} </a>
		</li>
	</ul>
	<p>Any server-side advice/help will be very welcomed! This is my first full-stack project.</p>
</template>
