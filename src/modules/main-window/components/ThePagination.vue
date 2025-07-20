<script setup lang="ts">
import { formatNumber } from "@/shared/utils/formatNumber.ts";

import { usePagination } from "../state/pagination.ts";
import { changePage } from "../usecases/search.ts";

const { pagination } = usePagination();

const toPrevPage = () => changePage(pagination.value.page - 1);
const toNextPage = () => changePage(pagination.value.page + 1);
</script>

<template>
	<div class="status-bar-field"><b>Results:</b> {{ formatNumber(pagination.total) }}</div>
	<div class="status-bar-field pagination" v-if="pagination.totalPages">
		<p><b>Page:</b> {{ pagination.page }} of {{ pagination.totalPages }}</p>
		<div class="controls">
			<a v-if="pagination.page > 1" href="" @click.prevent="toPrevPage">Prev page</a>
			<a v-if="pagination.page !== pagination.totalPages" href="" @click.prevent="toNextPage">
				Next page
			</a>
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
