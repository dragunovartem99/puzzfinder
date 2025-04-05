export async function findPuzzles(body) {
	const response = await fetch("https://puzzfinder.99x.space/puzzles", {
	// const response = await fetch("http://192.168.1.199:50000/puzzles", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	const { data, pagination } = await response.json();
	return { data, pagination };
}
