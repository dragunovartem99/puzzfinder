import { ref } from "vue";
import type { NumberRange } from "../../shared/types";

type Search = {
	filters: {
		rating: Partial<NumberRange>;
		movesNumber: Partial<NumberRange>;
		popularity: Partial<NumberRange>;
		nbPlays: Partial<NumberRange>;
		themes: string[];
	};
	sort: string;
};

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
