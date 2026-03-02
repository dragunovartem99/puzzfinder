import { expect, it } from "vitest";
import { mapPuzzle } from "./mapPuzzle";

it("maps puzzle with full set of fields", () => {
	const puzzle = mapPuzzle({
		puzzleId: "0009B",
		fen: "r2qr1k1/b1p2ppp/pp4n1/P1P1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 b - - 1 16",
		moves: "b6c5 e2g4 h3g4 d1g4",
		movesNumber: 2,
		rating: 1103,
		ratingDeviation: 74,
		popularity: 88,
		nbPlays: 604,
		gameUrl: "https://lichess.org/4MWQCxQ6/black#32",
		openingTags: "Kings_Pawn_Game Kings_Pawn_Game_Leonardis_Variation",
		themes: ["advantage", "middlegame", "short"],
	});

	expect(puzzle).toMatchSnapshot();
});
