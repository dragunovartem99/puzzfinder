export function formToPayload(form: HTMLFormElement) {
	const payload = { filters: {}, sort: {}, pagination: {} };

	const [sortField, sortOrder] = form.orderBy.value.split("-");
	payload.sort.field = sortField;
	payload.sort.order = sortOrder;

	payload.filters.themes = [...form.themes!.selectedOptions].map((option) => option.value);
	return payload;
}
