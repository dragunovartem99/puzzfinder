import type { API, UI } from "@/shared";

export function mapUrl(puzzleId: API.Puzzle["puzzleId"]): UI.Puzzle["url"] {
	return "https://lichess.org/training/" + puzzleId;
}
