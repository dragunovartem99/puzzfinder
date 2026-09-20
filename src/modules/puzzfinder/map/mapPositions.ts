import { Chess, normalizeMove } from "chessops/chess";
import { makeFen, parseFen } from "chessops/fen";
import { parseUci } from "chessops/util";

import type { API, UI } from "@/shared";

// Lichess stores the solution as UCI moves, the first one being the opponent's
export function mapPositions(puzzle: API.Puzzle): UI.Puzzle["positions"] {
	const setup = parseFen(puzzle.fen);
	if (setup.isErr) return [];

	const chess = Chess.fromSetup(setup.value);
	if (chess.isErr) return [];

	const position = chess.value;
	const positions: string[] = [];

	for (const uci of puzzle.moves.split(" ")) {
		const move = parseUci(uci);
		if (!move) break;

		const normalized = normalizeMove(position, move);
		if (!position.isLegal(normalized)) break;

		position.play(normalized);
		positions.push(makeFen(position.toSetup()));
	}

	return positions;
}
