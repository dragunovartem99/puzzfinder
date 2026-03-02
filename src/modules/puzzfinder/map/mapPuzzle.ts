import type { API, UI } from "@/shared";

export function mapPuzzle(input: API.Puzzle): UI.Puzzle {
	return {
		id: input.puzzleId,
		url: "https://lichess.org/training/" + input.puzzleId,
		fen: input.fen,

		// WARN: "Flipped" should be stored in DB
		flipped: input.fen.includes("w"),

		rating: input.rating,

		gameUrl: input.gameUrl,
		themes: input.themes.join(", "),

		duration: `${input.movesNumber} ${input.movesNumber > 1 ? 'moves' : 'move'}`,
	};
}
