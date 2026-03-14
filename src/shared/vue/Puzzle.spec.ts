import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Puzzle from "./Puzzle.vue";

const puzzle = {
	id: "abc",
	fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
	url: "https://lichess.org/training/abc",
	flipped: false,
	rating: 1500,
	length: "Short (2)",
};

describe("Puzzle", () => {
	it("renders puzzle rating and length", () => {
		const wrapper = mount(Puzzle, { props: { puzzle } });
		expect(wrapper.text()).toContain("1500");
		expect(wrapper.text()).toContain("Short (2)");
	});

	it("sets flipped attribute when puzzle is flipped", () => {
		const wrapper = mount(Puzzle, {
			props: { puzzle: { ...puzzle, flipped: true } },
		});
		expect(wrapper.find("html-diagram").attributes("flipped")).toBe("flipped");
	});
});
