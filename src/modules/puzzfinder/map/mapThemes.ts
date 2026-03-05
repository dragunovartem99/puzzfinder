import type { API, UI } from "@/shared";

export function mapThemes(themes: API.Puzzle["themes"]): UI.Puzzle["themes"] {
	return themes.join(", ");
}
