import { expect, it } from "vitest";

import { mapSolution } from "../mapSolution";

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

it("returns the solver's moves in SAN, skipping the opponent's first move", () => {
	expect(mapSolution(puzzle)).toBe("17. Bxg4 Bxg4 18. Qxg4");
});

it("numbers black's moves with an ellipsis", () => {
	expect(
		mapSolution({
			...puzzle,
			fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
			moves: "e2e4 e7e5 g1f3",
		})
	).toBe("1... e5 2. Nf3");
});

it("stops at the first illegal move", () => {
	expect(mapSolution({ ...puzzle, moves: "b6c5 e2g4 a1a8" })).toBe("17. Bxg4");
});

it("returns an empty string for an invalid fen", () => {
	expect(mapSolution({ ...puzzle, fen: "nonsense" })).toBe("");
});
