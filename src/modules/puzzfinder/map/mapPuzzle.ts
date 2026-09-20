import type { API, UI } from "@/shared";

import { isFlipped } from "./isFlipped";
import { mapLength } from "./mapLength";
import { mapPositions } from "./mapPositions";
import { mapSolution } from "./mapSolution";
import { mapUrl } from "./mapUrl";

export function mapPuzzle(puzzle: API.Puzzle): UI.Puzzle {
	return {
		fen: puzzle.fen,
		id: puzzle.puzzleId,
		rating: puzzle.rating,
		url: mapUrl(puzzle.puzzleId),
		flipped: isFlipped(puzzle.fen),
		length: mapLength(puzzle.movesNumber),
		positions: mapPositions(puzzle),
		solution: mapSolution(puzzle),
	};
}
