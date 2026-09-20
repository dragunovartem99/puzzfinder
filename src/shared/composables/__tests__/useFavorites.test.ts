import { beforeEach, expect, it } from "vitest";
import { nextTick } from "vue";

import { useFavorites } from "../useFavorites";

const puzzle = {
	id: "abc",
	fen: "8/8/8/8/8/8/8/8 w - - 0 1",
	url: "https://lichess.org/training/abc",
	flipped: false,
	rating: 1500,
	length: "Short (2)",
	positions: [],
	solution: "1. e4",
};

beforeEach(() => {
	useFavorites().clear();
});

it("toggles a puzzle on and off", () => {
	const { has, toggle } = useFavorites();

	toggle(puzzle);
	expect(has("abc")).toBe(true);

	toggle(puzzle);
	expect(has("abc")).toBe(false);
});

it("persists favorites to localStorage", async () => {
	useFavorites().toggle(puzzle);
	await nextTick();

	const stored = JSON.parse(localStorage.getItem("puzzfinder:favorites")!);
	expect(stored).toEqual([puzzle]);
});

it("removes a single puzzle", () => {
	const { favorites, toggle, remove } = useFavorites();

	toggle(puzzle);
	toggle({ ...puzzle, id: "def" });
	remove("abc");

	expect(favorites.value.map((p) => p.id)).toEqual(["def"]);
});
