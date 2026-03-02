import type { API, UI } from "@/shared";

export function mapUrl(puzzleId: API.Puzzle["puzzleId"]): UI.Puzzle["url"] {
	return "https://lichess.org/training/" + puzzleId;
}

// WARN: Most likely, this should be stored in DB (side to move)
export function isFlipped(fen: API.Puzzle["fen"]): UI.Puzzle["flipped"] {
	return fen.includes("w");
}

export function mapThemes(themes: API.Puzzle["themes"]): UI.Puzzle["themes"] {
	return themes.join(", ");
}

export function mapDuration(movesNumber: API.Puzzle["movesNumber"]): UI.Puzzle["duration"] {
	return `${movesNumber} ${movesNumber > 1 ? "moves" : "move"}`;
}

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
