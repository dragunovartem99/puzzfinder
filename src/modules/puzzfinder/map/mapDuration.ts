import type { API, UI } from "@/shared";

export function mapDuration(movesNumber: API.Puzzle["movesNumber"]): UI.Puzzle["duration"] {
	return `${movesNumber} ${movesNumber > 1 ? "moves" : "move"}`;
}
