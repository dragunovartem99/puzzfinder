import type { UI } from "@/shared";

// What happens on the board: the phase of the game, and the tactical motifs.
export const TACTIC_THEMES: UI.OptionGroup[] = [
	{
		label: "Phases",
		options: [
			{ key: "opening", label: "Opening" },
			{ key: "middlegame", label: "Middlegame" },
			{ key: "endgame", label: "Endgame" },
			{ key: "pawnEndgame", label: "Pawn endgame" },
			{ key: "knightEndgame", label: "Knight endgame" },
			{ key: "bishopEndgame", label: "Bishop endgame" },
			{ key: "rookEndgame", label: "Rook endgame" },
			{ key: "queenEndgame", label: "Queen endgame" },
			{ key: "queenRookEndgame", label: "Queen and rook endgame" },
		],
	},
	{
		label: "Motifs",
		options: [
			{ key: "advancedPawn", label: "Advanced pawn" },
			{ key: "attackingF2F7", label: "Attacking f2 or f7" },
			{ key: "capturingDefender", label: "Capturing defender" },
			{ key: "discoveredAttack", label: "Discovered attack" },
			{ key: "discoveredCheck", label: "Discovered check" },
			{ key: "doubleCheck", label: "Double check" },
			{ key: "exposedKing", label: "Exposed king" },
			{ key: "fork", label: "Fork" },
			{ key: "hangingPiece", label: "Hanging piece" },
			{ key: "kingsideAttack", label: "Kingside attack" },
			{ key: "pin", label: "Pin" },
			{ key: "queensideAttack", label: "Queenside attack" },
			{ key: "sacrifice", label: "Sacrifice" },
			{ key: "skewer", label: "Skewer" },
			{ key: "trappedPiece", label: "Trapped piece" },
		],
	},
	{
		label: "Advanced",
		options: [
			{ key: "attraction", label: "Attraction" },
			{ key: "clearance", label: "Clearance" },
			{ key: "defensiveMove", label: "Defensive move" },
			{ key: "deflection", label: "Deflection" },
			{ key: "interference", label: "Interference" },
			{ key: "intermezzo", label: "Intermezzo" },
			{ key: "quietMove", label: "Quiet move" },
			{ key: "xRayAttack", label: "X-ray attack" },
			{ key: "zugzwang", label: "Zugzwang" },
		],
	},
];
