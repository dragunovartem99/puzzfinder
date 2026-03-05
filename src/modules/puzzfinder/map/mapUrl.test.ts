import { expect, it } from "vitest";
import { mapUrl } from "./mapUrl";

it("prepends lichess training URL to puzzleId", () => {
	expect(mapUrl("g7STS")).toMatchSnapshot();
});
