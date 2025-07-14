import { ref } from "vue";
import type { Search } from "../types";

export const search = ref<Search>({
	filters: {
		rating: {},
		movesNumber: {},
		popularity: {},
		nbPlays: {},
		themes: [],
	},
	sort: "rating-desc",
});
