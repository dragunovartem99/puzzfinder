import { expect, it } from "vitest";
import { isFlipped } from "./isFlipped";

it("returns true when white is to move", () => {
	expect(isFlipped("6k1/5p1p/4p3/4q3/3nN3/2Q3P1/PP3P1P/6K1 w - - 2 37")).toBe(true);
});

it("returns false when black is to move", () => {
	expect(isFlipped("r2qr1k1/b1p2ppp/pp4n1/P1P1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 b - - 1 16")).toBe(false);
});
