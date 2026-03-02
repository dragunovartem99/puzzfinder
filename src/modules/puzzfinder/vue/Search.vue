<script setup lang="ts">
import { submitForm } from '../actions';
</script>

<template>
	<form @submit.prevent="submitForm">
		<button>Search</button>
	</form>
</template>
