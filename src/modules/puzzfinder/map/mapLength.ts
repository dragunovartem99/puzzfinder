import type { API, UI } from "@/shared";

export function mapLength(movesNumber: API.Puzzle["movesNumber"]): UI.Puzzle["length"] {
	return `${movesNumber} ${movesNumber > 1 ? "moves" : "move"}`;
}
