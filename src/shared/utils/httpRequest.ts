type Input = {
	method: string;
	url: string;
	payload: unknown;
};

export async function httpRequest<Data>(input: Input): Promise<Data> {
	const { method, url, payload } = input;

	const response = await fetch(url, {
		method,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Something went wrong");
	}

	return (await response.json()) as Data;
}
