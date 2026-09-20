import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import PrintSheet from "../PrintSheet.vue";

const makePuzzle = (n: number) => ({
	id: `p${n}`,
	fen: "8/8/8/8/8/8/8/8 b - - 0 1",
	url: `https://lichess.org/training/p${n}`,
	flipped: n % 2 === 0,
	rating: 1000 + n,
	length: "Short (2)",
	positions: ["8/8/8/8/8/8/8/8 w - - 0 2"],
	solution: `1. move${n}`,
});

const puzzles = Array.from({ length: 7 }, (_, i) => makePuzzle(i + 1));

describe("PrintSheet", () => {
	it("puts six diagrams on a page", () => {
		const wrapper = mount(PrintSheet, { props: { puzzles, withSolutions: false } });
		const pages = wrapper.findAll(".diagrams");

		expect(pages).toHaveLength(2);
		expect(pages[0]!.findAll("figure")).toHaveLength(6);
		expect(pages[1]!.findAll("figure")).toHaveLength(1);
	});

	it("names the side to move", () => {
		const wrapper = mount(PrintSheet, { props: { puzzles, withSolutions: false } });
		const captions = wrapper.findAll("figcaption").map((c) => c.text());

		expect(captions[0]).toContain("1. White to move");
		expect(captions[1]).toContain("2. Black to move");
	});

	it("adds numbered solutions on separate pages when enabled", () => {
		const wrapper = mount(PrintSheet, { props: { puzzles, withSolutions: true } });
		const items = wrapper.findAll(".solutions li");

		expect(items).toHaveLength(7);
		expect(items[6]!.text()).toBe("1. move7");
	});

	it("omits solutions when disabled", () => {
		const wrapper = mount(PrintSheet, { props: { puzzles, withSolutions: false } });
		expect(wrapper.find(".solutions").exists()).toBe(false);
	});
});
