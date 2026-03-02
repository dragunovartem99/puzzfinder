<script setup lang="ts">
import { searchPuzzles } from '../api';
</script>

<template>
	<form @submit.prevent="searchPuzzles">
		<button>Search</button>
	</form>
</template>
