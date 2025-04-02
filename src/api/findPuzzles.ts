export async function findPuzzles(body) {
	// const response = await fetch("https://puzzfinder.99x.space/puzzles", {
	const response = await fetch("http://localhost:50000/puzzles", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	const { data, pagination } = await response.json();
	return { data, pagination };
}
