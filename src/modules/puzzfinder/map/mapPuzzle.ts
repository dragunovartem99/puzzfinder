import type { API, UI } from "@/shared";

import { isFlipped } from "./isFlipped";
import { mapDuration } from "./mapDuration";
import { mapUrl } from "./mapUrl";

export function mapPuzzle(puzzle: API.Puzzle): UI.Puzzle {
	return {
		fen: puzzle.fen,
		id: puzzle.puzzleId,
		rating: puzzle.rating,
		url: mapUrl(puzzle.puzzleId),
		flipped: isFlipped(puzzle.fen),
		duration: mapDuration(puzzle.movesNumber),
	};
}
