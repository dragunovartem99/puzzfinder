import type { API } from "@/shared";

export const INITIAL_SEARCH: API.Search = {
	filters: {
		themes: [],
	},
	sort: {
		field: "rating",
		order: "desc",
	},
	pagination: {
		page: 1,
		limit: 12,
	},
};
