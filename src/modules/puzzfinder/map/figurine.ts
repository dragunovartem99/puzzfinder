const FIGURINES: Record<string, string> = {
	K: "♔",
	Q: "♕",
	R: "♖",
	B: "♗",
	N: "♘",
};

// SAN uses uppercase letters only for pieces, so every matching character is a piece
export function figurine(san: string): string {
	return [...san].map((char) => FIGURINES[char] ?? char).join("");
}
