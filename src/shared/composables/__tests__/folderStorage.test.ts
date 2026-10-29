import { beforeEach, expect, it } from "vitest";

import { loadFolders } from "../folderStorage";

beforeEach(() => localStorage.clear());

it("migrates legacy favorites into the first folder", () => {
	localStorage.setItem("puzzfinder:favorites", JSON.stringify([{ id: "abc" }, { id: "def" }]));

	const [folder] = loadFolders();
	expect(folder?.name).toBe("Favorites");
	expect(folder?.puzzles).toEqual(["abc", "def"]);
});

it("falls back to an empty folder on corrupt storage", () => {
	localStorage.setItem("puzzfinder:folders", "{not json");

	expect(loadFolders()[0]?.puzzles).toEqual([]);
});
