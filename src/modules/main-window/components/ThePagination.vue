<script setup lang="ts">
import { watch } from "vue";
import { pagination, toPrevPage, toNextPage } from "../state/pagination";
import { formatNumber } from "@/shared/utils/formatNumber";
import { submitSearchForm } from "../user-actions/submitSearchForm";

watch(() => pagination.value.page, submitSearchForm);
</script>

<template>
	<div class="status-bar-field"><b>Results:</b> {{ formatNumber(pagination.total || 0) }}</div>
	<div class="status-bar-field pagination" v-if="pagination.totalPages > 1">
		<p><b>Page:</b> {{ pagination.page }} of {{ pagination.totalPages }}</p>
		<div class="controls">
			<a v-if="pagination.page > 1" href="" @click.prevent="toPrevPage">Prev page</a>
			<a href="" @click.prevent="toNextPage">Next page</a>
		</div>
	</div>
</template>

<style scoped>
.pagination {
	display: flex;
	justify-content: space-between;
	gap: 20px;
}

.pagination p {
	margin: 0;
}

.controls {
	display: flex;
	gap: 10px;
}
</style>
