type Input = {
	method: string;
	path: `/${string}`;
	payload: unknown;
};

const API_BASE_URL = "https://puzzfinder.99x.space/api";

export async function apiRequest<Data>(input: Input): Promise<Data> {
	const { method, path, payload } = input;

	const url = API_BASE_URL.concat(path);

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
