<script setup lang="ts">
import type { UI } from "@/shared";

const links: UI.Link[] = [
	{
		url: "https://github.com/dragunovartem99/puzzfinder",
		label: "Client-side web interface",
	},
	{
		url: "https://github.com/dragunovartem99/puzzfinder-api",
		label: "Application programming interface",
	},
	{
		url: "https://github.com/dragunovartem99/puzzfinder-db",
		label: "DuckDB database with chess puzzles",
	},
];
</script>

<template>
	<section>
		<p>The project consists of three components:</p>
		<ul>
			<li
				v-for="(link, index) of links"
				:key="index"
			>
				<a
					:href="link.url"
					target="_blank"
				>
					{{ link.label }}
				</a>
			</li>
		</ul>
		<p>
			Any server-side advice/help will be very welcomed! This is my first full-stack project.
		</p>
	</section>
</template>
