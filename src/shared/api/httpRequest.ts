const API = "https://puzzfinder.99x.space/api";

type Params =
	| { endpoint: string; method?: "GET" }
	| { endpoint: string; method: "POST"; payload: unknown };

export async function httpRequest<T>(params: Params): Promise<T> {
	const initOptions: RequestInit = {
		method: params.method ?? "GET",
	};

	if (params.method === "POST") {
		initOptions.headers = { "Content-Type": "application/json" };
		initOptions.body = JSON.stringify(params.payload);
	}

	const response = await fetch(API + params.endpoint, initOptions);

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}
