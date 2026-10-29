import { computed, ref, watch } from "vue";

import type { UI } from "../types";
import { DEFAULT_FOLDER, loadFolders, makeFolder, saveFolders } from "./folderStorage";

type Membership = { folderId: UI.Folder["id"]; puzzleId: UI.Puzzle["id"] };

const folders = ref<UI.Folder[]>(loadFolders());
const selectedId = ref(folders.value[0]?.id);

watch(folders, saveFolders, { deep: true });

// There is always at least one folder, so the fallback never shows
const selected = computed(
	() => find(selectedId.value ?? "") ?? folders.value[0] ?? makeFolder(DEFAULT_FOLDER)
);

const find = (id: UI.Folder["id"]) => folders.value.find((folder) => folder.id === id);

const sameIds = (a: string[], b: string[]) =>
	a.length === b.length && a.every((id) => b.includes(id));

const select = (id: UI.Folder["id"]) => {
	selectedId.value = id;
};

const create = (name: string, puzzles: string[] = []) => {
	const folder = makeFolder(name, puzzles);
	folders.value.push(folder);
	select(folder.id);
	return folder;
};

const rename = ({ id, name }: Pick<UI.Folder, "id" | "name">) => {
	const folder = find(id);
	if (folder) folder.name = name;
};

const remove = (id: UI.Folder["id"]) => {
	folders.value = folders.value.filter((folder) => folder.id !== id);
	if (folders.value.length === 0) folders.value.push(makeFolder(DEFAULT_FOLDER));
};

const has = ({ folderId, puzzleId }: Membership) =>
	find(folderId)?.puzzles.includes(puzzleId) ?? false;

const isSaved = (puzzleId: UI.Puzzle["id"]) =>
	folders.value.some((folder) => folder.puzzles.includes(puzzleId));

const toggle = ({ folderId, puzzleId }: Membership) => {
	const folder = find(folderId);
	if (!folder) return;
	folder.puzzles = has({ folderId, puzzleId })
		? folder.puzzles.filter((id) => id !== puzzleId)
		: [...folder.puzzles, puzzleId];
};

// A shared link opened twice selects the existing copy instead of duplicating it
const importShared = (ids: string[]) => {
	const existing = folders.value.find((folder) => sameIds(folder.puzzles, ids));
	if (existing) select(existing.id);
	else create("Shared", ids);
};

const reset = () => {
	folders.value = [makeFolder(DEFAULT_FOLDER)];
	selectedId.value = folders.value[0]?.id;
};

export function useFolders() {
	return {
		folders,
		selected,
		select,
		create,
		rename,
		remove,
		has,
		isSaved,
		toggle,
		importShared,
		reset,
	};
}
