<script setup lang="ts">
type Link = { href: string; text: string };

const links: Link[] = [
	{
		href: "https://github.com/dragunovartem99/puzzfinder",
		text: "Client-side web interface",
	},
	{
		href: "https://github.com/dragunovartem99/puzzfinder-api",
		text: "Application programming interface",
	},
	{
		href: "https://github.com/dragunovartem99/puzzfinder-db",
		text: "SQLite database with chess puzzles",
	},
];
</script>

<template>
	<p>The project consists of three components:</p>
	<ul>
		<li v-for="link of links">
			<a :href="link.href" target="_blank"> {{ link.text }} </a>
		</li>
	</ul>
	<p>Any server-side advice/help will be very welcomed! This is my first full-stack project.</p>
</template>
