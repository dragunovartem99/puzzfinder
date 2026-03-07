import { expect, it } from "vitest";
import { mapLength } from "./mapLength";

it("uses singular form for one move", () => {
	expect(mapLength(1)).toMatchSnapshot();
});

it("uses plural form for multiple moves", () => {
	expect(mapLength(3)).toMatchSnapshot();
});
