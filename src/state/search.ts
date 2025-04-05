import { ref } from "vue";

export const search = ref({
	filters: {
		rating: {},
		movesNumber: {},
		popularity: {},
		nbPlays: {},
		themes: [],
	},
	sort: "puzzleId-asc",
});
