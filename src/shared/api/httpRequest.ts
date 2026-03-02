const API = "https://puzzfinder.99x.space/api";

type Params = {
	endpoint: string;
	method: "GET" | "POST";
};

export async function httpRequest<T>(params: Params): Promise<T> {
	const { endpoint, method } = params;

	const fullEndpoint = API + endpoint;

	const response = await fetch(fullEndpoint, {
		method,
	});

	return response.json();
}
