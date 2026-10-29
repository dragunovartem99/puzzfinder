const PARAM = "shared";
const ID = /^[A-Za-z0-9]{1,16}$/u;

export function mapShareUrl(ids: string[]): string {
	const base = location.origin + location.pathname + location.search;
	return `${base}#${PARAM}=${ids.join(",")}`;
}

export function parseShareHash(hash: string): string[] {
	const value = new URLSearchParams(hash.replace(/^#/u, "")).get(PARAM) ?? "";
	return value.split(",").filter((id) => ID.test(id));
}
