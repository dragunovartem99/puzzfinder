import { expect, it } from "vitest";

import { figurine } from "../figurine";

it("replaces piece letters with figurines", () => {
	expect(figurine("17. Bxg4 Bxg4 18. Qxg4")).toBe("17. ♗xg4 ♗xg4 18. ♕xg4");
});

it("handles promotion and keeps pawn moves, files and castling intact", () => {
	expect(figurine("1. e8=N+ Kxe8 2. O-O-O b4")).toBe("1. e8=♘+ ♔xe8 2. O-O-O b4");
});
