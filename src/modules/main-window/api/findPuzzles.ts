import type { SearchPayload } from "../types";

export async function findPuzzles(body: SearchPayload) {
	const response = await fetch("https://puzzfinder.99x.space/puzzles", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	if (!response.ok) throw new Error("Something went wrong");

	const { data, pagination } = await response.json();
	return { data, pagination };
}
