import { expect, it } from "vitest";
import { mapThemes } from "./mapThemes";

it("joins single theme", () => {
	expect(mapThemes(["endgame"])).toMatchSnapshot();
});

it("joins multiple themes", () => {
	expect(mapThemes(["advantage", "middlegame", "short"])).toMatchSnapshot();
});
