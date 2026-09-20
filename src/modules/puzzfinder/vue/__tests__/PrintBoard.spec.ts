import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import PrintBoard from "../PrintBoard.vue";

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe("PrintBoard", () => {
	it("renders 64 squares", () => {
		const wrapper = mount(PrintBoard, { props: { fen: START, flipped: false } });
		expect(wrapper.findAll("span")).toHaveLength(64);
	});

	it("picks the glyph by piece and square color", () => {
		const glyphs = mount(PrintBoard, { props: { fen: "8/8/8/8/8/8/8/R7", flipped: false } })
			.findAll("span")
			.map((cell) => cell.text());

		expect(glyphs[56]).toBe("r");
		expect(glyphs[57]).toBe("+");
		expect(glyphs[58]).toBe("=");
	});

	it("reverses the board when flipped", () => {
		const glyphs = mount(PrintBoard, { props: { fen: "8/8/8/8/8/8/8/R7", flipped: true } })
			.findAll("span")
			.map((cell) => cell.text());

		expect(glyphs[7]).toBe("r");
	});
});
