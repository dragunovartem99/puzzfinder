import type { UI } from "@/shared";

// What the puzzle ends in, and where it came from: mates, special moves, goals, length, origin.
export const OUTCOME_THEMES: UI.OptionGroup[] = [
	{
		label: "Mates",
		options: [
			{ key: "mate", label: "Checkmate" },
			{ key: "mateIn1", label: "Mate in 1" },
			{ key: "mateIn2", label: "Mate in 2" },
			{ key: "mateIn3", label: "Mate in 3" },
			{ key: "mateIn4", label: "Mate in 4" },
			{ key: "mateIn5", label: "Mate in 5" },
		],
	},
	{
		label: "Mate themes",
		options: [
			{ key: "anastasiaMate", label: "Anastasia mate" },
			{ key: "arabianMate", label: "Arabian mate" },
			{ key: "backRankMate", label: "Back rank mate" },
			{ key: "balestraMate", label: "Balestra mate" },
			{ key: "blindSwineMate", label: "Blind Swine mate" },
			{ key: "bodenMate", label: "Boden's mate" },
			{ key: "cornerMate", label: "Corner mate" },
			{ key: "doubleBishopMate", label: "Double bishop mate" },
			{ key: "dovetailMate", label: "Dovetail mate" },
			{ key: "epauletteMate", label: "Epaulette mate" },
			{ key: "hookMate", label: "Hook mate" },
			{ key: "killBoxMate", label: "Kill box mate" },
			{ key: "pillsburysMate", label: "Pillsbury's mate" },
			{ key: "morphysMate", label: "Morphy's mate" },
			{ key: "operaMate", label: "Opera mate" },
			{ key: "swallowstailMate", label: "Swallow's Tail mate" },
			{ key: "triangleMate", label: "Triangle mate" },
			{ key: "smotheredMate", label: "Smothered mate" },
			{ key: "vukovicMate", label: "Vukovic mate" },
		],
	},
	{
		label: "Special moves",
		options: [
			{ key: "castling", label: "Castling" },
			{ key: "enPassant", label: "En passant" },
			{ key: "promotion", label: "Promotion" },
			{ key: "underPromotion", label: "Underpromotion" },
		],
	},
	{
		label: "Goals",
		options: [
			{ key: "equality", label: "Equality" },
			{ key: "advantage", label: "Advantage" },
			{ key: "crushing", label: "Crushing" },
		],
	},
	{
		label: "Lengths",
		options: [
			{ key: "oneMove", label: "One move" },
			{ key: "short", label: "Short" },
			{ key: "long", label: "Long" },
			{ key: "veryLong", label: "Very Long" },
		],
	},
	{
		label: "Origin",
		options: [
			{ key: "master", label: "Master games" },
			{ key: "masterVsMaster", label: "Master vs Master games" },
			{ key: "superGM", label: "Super GM games" },
		],
	},
];
