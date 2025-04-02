export function createSearchBody(state: any) {
	const payload = JSON.parse(JSON.stringify(state));

	const [sortField, sortOrder] = payload.sort.split("-");

	payload.sort = {};
	payload.sort.field = sortField;
	payload.sort.order = sortOrder;

	return payload;
}
