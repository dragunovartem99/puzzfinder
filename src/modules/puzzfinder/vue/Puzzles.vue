<script setup lang="ts">
import { usePuzzles } from '../state';
const { state } = usePuzzles();
</script>

<template>
	<div>
		{{ state }}
	</div>
</template>
