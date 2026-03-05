import type { API, UI } from "@/shared";

// WARN: Most likely, this should be stored in DB (side to move)
export function isFlipped(fen: API.Puzzle["fen"]): UI.Puzzle["flipped"] {
	return fen.includes("w");
}
