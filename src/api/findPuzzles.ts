export async function findPuzzles(payload) {
	// const response = await fetch("https://puzzfinder.99x.space/puzzles", {
	const response = await fetch("http://localhost:50000/puzzles", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const data = await response.json();
	console.log(data);
}
