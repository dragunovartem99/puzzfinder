import { Chess, normalizeMove } from "chessops/chess";
import { parseFen } from "chessops/fen";
import { makeSanVariation } from "chessops/san";
import type { Move } from "chessops/types";
import { parseUci } from "chessops/util";

import type { API, UI } from "@/shared";

// Solver's moves in SAN, e.g. "1. Bxg4 hxg4 2. Qxg4" (the opponent's first move is not included)
export function mapSolution(puzzle: API.Puzzle): UI.Puzzle["solution"] {
	const setup = parseFen(puzzle.fen);
	if (setup.isErr) return "";

	const chess = Chess.fromSetup(setup.value);
	if (chess.isErr) return "";

	const position = chess.value;
	const [first, ...rest] = puzzle.moves.split(" ");

	const opponentMove = parseUci(first ?? "");
	if (!opponentMove) return "";

	position.play(normalizeMove(position, opponentMove));

	const scratch = position.clone();
	const variation: Move[] = [];

	for (const uci of rest) {
		const move = parseUci(uci);
		if (!move) break;

		const normalized = normalizeMove(scratch, move);
		if (!scratch.isLegal(normalized)) break;

		scratch.play(normalized);
		variation.push(normalized);
	}

	return makeSanVariation(position, variation);
}
