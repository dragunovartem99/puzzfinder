import type { UI } from "../types";

const KEY = "puzzfinder:folders";
const LEGACY_KEY = "puzzfinder:favorites";

export const DEFAULT_FOLDER = "Favorites";

const newId = () => Math.random().toString(36).slice(2, 10);

export const makeFolder = (name: string, puzzles: string[] = []): UI.Folder => ({
	id: newId(),
	name,
	puzzles,
});

function read(key: string): unknown {
	try {
		return JSON.parse(localStorage.getItem(key) ?? "null");
	} catch {
		return null;
	}
}

// Favorites used to be a flat list of full puzzles; they become the first folder
function migrate(): UI.Folder[] {
	const legacy = read(LEGACY_KEY);
	const ids = Array.isArray(legacy) ? legacy.map((puzzle) => puzzle?.id) : [];
	return [
		makeFolder(
			DEFAULT_FOLDER,
			ids.filter((id) => typeof id === "string")
		),
	];
}

export function loadFolders(): UI.Folder[] {
	const stored = read(KEY);
	return Array.isArray(stored) && stored.length > 0 ? stored : migrate();
}

export function saveFolders(folders: UI.Folder[]) {
	try {
		localStorage.setItem(KEY, JSON.stringify(folders));
		localStorage.removeItem(LEGACY_KEY);
	} catch {
		// Storage is unavailable or full: folders stay in memory for this session
	}
}
