import { beforeEach, expect, it } from "vitest";
import { nextTick } from "vue";

import { useFolders } from "../useFolders";

beforeEach(() => useFolders().reset());

it("starts with a single Favorites folder", () => {
	const { folders, selected } = useFolders();

	expect(folders.value.map((folder) => folder.name)).toEqual(["Favorites"]);
	expect(selected.value.id).toBe(folders.value[0]?.id);
});

it("toggles a puzzle in a folder", () => {
	const { selected, has, isSaved, toggle } = useFolders();
	const membership = { folderId: selected.value.id, puzzleId: "abc" };

	toggle(membership);
	expect(has(membership)).toBe(true);
	expect(isSaved("abc")).toBe(true);

	toggle(membership);
	expect(has(membership)).toBe(false);
});

it("creates, renames, selects and deletes folders", () => {
	const { folders, selected, create, rename, remove, select } = useFolders();

	const folder = create("Worksheet");
	expect(selected.value.id).toBe(folder.id);

	rename({ id: folder.id, name: "Lesson 1" });
	expect(selected.value.name).toBe("Lesson 1");

	select(folders.value[0]!.id);
	remove(folder.id);
	expect(folders.value.map((f) => f.name)).toEqual(["Favorites"]);
});

it("never leaves the user without a folder", () => {
	const { folders, selected, remove } = useFolders();

	remove(selected.value.id);
	expect(folders.value).toHaveLength(1);
	expect(selected.value.id).toBe(folders.value[0]?.id);
});

it("persists folders to localStorage", async () => {
	const { selected, toggle } = useFolders();
	toggle({ folderId: selected.value.id, puzzleId: "abc" });
	await nextTick();

	const stored = JSON.parse(localStorage.getItem("puzzfinder:folders")!);
	expect(stored[0].puzzles).toEqual(["abc"]);
});

it("imports a shared list once", () => {
	const { folders, selected, importShared } = useFolders();

	importShared(["a", "b"]);
	importShared(["b", "a"]);

	expect(folders.value).toHaveLength(2);
	expect(selected.value.name).toBe("Shared");
	expect(selected.value.puzzles).toEqual(["a", "b"]);
});
