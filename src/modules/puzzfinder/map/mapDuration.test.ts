import { expect, it } from "vitest";
import { mapDuration } from "./mapDuration";

it("uses singular form for one move", () => {
	expect(mapDuration(1)).toMatchSnapshot();
});

it("uses plural form for multiple moves", () => {
	expect(mapDuration(3)).toMatchSnapshot();
});
