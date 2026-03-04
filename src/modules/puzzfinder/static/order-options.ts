import type { UI } from "@/shared";

export const orderOptions: UI.Option[] = [
	{ label: "Highest rating", key: "rating-desc" },
	{ label: "Highest moves number", key: "movesNumber-desc" },
	{ label: "Highest popularity", key: "popularity-desc" },
	{ label: "Highest times played", key: "nbPlays-desc" },
	{ label: "Lowest rating", key: "rating-asc" },
	{ label: "Lowest moves number", key: "movesNumber-asc" },
	{ label: "Lowest popularity", key: "popularity-asc" },
	{ label: "Lowest times played", key: "nbPlays-asc" },
	{ label: "Puzzle ID", key: "puzzleId-asc" },
	{ label: "Puzzle ID (reversed)", key: "puzzleId-desc" },
];
