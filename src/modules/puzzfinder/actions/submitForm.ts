import { searchPuzzles } from "../api";
import { usePagination, usePuzzles } from "../state";

export async function submitForm() {
	const response = await searchPuzzles();

	if (response) {
		usePuzzles().setState(response.data);
		usePagination().setState(response.pagination);
	}
}
