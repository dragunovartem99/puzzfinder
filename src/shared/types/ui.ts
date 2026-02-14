import type { PuzzleResponse, RangePayload } from "./api";

type WithEmptyString<T> = {
	[K in keyof T]-?: T[K] | "";
};

export type RangeFilter = WithEmptyString<RangePayload>;

export type Puzzle = Omit<PuzzleResponse, "themes"> & { themes: string };
