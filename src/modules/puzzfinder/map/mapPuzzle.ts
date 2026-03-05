import type { API, UI } from "@/shared";

import { isFlipped } from "./isFlipped";
import { mapDuration } from "./mapDuration";
import { mapThemes } from "./mapThemes";
import { mapUrl } from "./mapUrl";

export function mapPuzzle(puzzle: API.Puzzle): UI.Puzzle {
	return {
		fen: puzzle.fen,
		id: puzzle.puzzleId,
		rating: puzzle.rating,
		gameUrl: puzzle.gameUrl,
		url: mapUrl(puzzle.puzzleId),
		flipped: isFlipped(puzzle.fen),
		themes: mapThemes(puzzle.themes),
		duration: mapDuration(puzzle.movesNumber),
	};
}
