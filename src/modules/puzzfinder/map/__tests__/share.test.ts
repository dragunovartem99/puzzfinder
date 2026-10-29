import { expect, it } from "vitest";

import { mapShareUrl, parseShareHash } from "../share";

it("builds a link that parses back to the same ids", () => {
	const ids = ["abc12", "XYZ"];
	expect(parseShareHash(new URL(mapShareUrl(ids)).hash)).toEqual(ids);
});

it("drops malformed ids and other hashes", () => {
	expect(parseShareHash("#shared=abc,a;b,,def")).toEqual(["abc", "def"]);
	expect(parseShareHash("#about")).toEqual([]);
	expect(parseShareHash("")).toEqual([]);
});
