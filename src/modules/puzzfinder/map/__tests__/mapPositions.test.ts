import { expect, it } from "vitest";

import { mapPositions } from "../mapPositions";

const puzzle = {
	puzzleId: "0009B",
	fen: "r2qr1k1/b1p2ppp/pp4n1/P1P1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 b - - 1 16",
	moves: "b6c5 e2g4 h3g4 d1g4",
	movesNumber: 2,
	rating: 1103,
	ratingDeviation: 74,
	popularity: 88,
	nbPlays: 604,
	gameUrl: "https://lichess.org/4MWQCxQ6/black#32",
	openingTags: "",
	themes: [],
};

it("returns one position per move, starting after the opponent's move", () => {
	const positions = mapPositions(puzzle);

	expect(positions).toHaveLength(4);
	expect(positions[0]).toBe(
		"r2qr1k1/b1p2ppp/p5n1/P1p1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 w - - 0 17"
	);
});

it("stops at the first illegal move", () => {
	expect(mapPositions({ ...puzzle, moves: "b6c5 a1a8" })).toHaveLength(1);
});

it("returns nothing for an invalid fen", () => {
	expect(mapPositions({ ...puzzle, fen: "nonsense" })).toEqual([]);
});

it("handles castling", () => {
	const [position] = mapPositions({
		...puzzle,
		fen: "r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1",
		moves: "e1g1",
	});

	expect(position).toBe("r3k2r/8/8/8/8/8/8/R4RK1 b kq - 1 1");
});

it("handles promotion", () => {
	const [position] = mapPositions({
		...puzzle,
		fen: "8/P6k/8/8/8/8/8/K7 w - - 0 1",
		moves: "a7a8q",
	});

	expect(position).toBe("Q7/7k/8/8/8/8/8/K7 b - - 0 1");
});
