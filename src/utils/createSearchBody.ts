export function createSearchBody({ search, pagination }: any) {
	const payload = JSON.parse(JSON.stringify({ ...search, pagination }));

	const [sortField, sortOrder] = payload.sort.split("-");

	payload.sort = {};
	payload.sort.field = sortField;
	payload.sort.order = sortOrder;

	return payload;
}
