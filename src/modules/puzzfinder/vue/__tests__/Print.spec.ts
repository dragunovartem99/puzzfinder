import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Print from "../Print.vue";

const puzzle = {
	id: "abc",
	fen: "8/8/8/8/8/8/8/8 b - - 0 1",
	url: "https://lichess.org/training/abc",
	flipped: false,
	rating: 1500,
	length: "2 moves",
	positions: ["8/8/8/8/8/8/8/8 w - - 0 2"],
	solution: "1. e4",
};

describe("Print", () => {
	it("shows the puzzle count", () => {
		const wrapper = mount(Print, { props: { puzzles: [puzzle], title: "Lesson" } });

		expect(wrapper.find("button").text()).toBe("Print (1)");
		wrapper.unmount();
	});

	it("only renders the print sheet when there are puzzles", async () => {
		const wrapper = mount(Print, {
			props: { puzzles: [], title: "Lesson" },
			attachTo: document.body,
		});
		expect(document.querySelector(".print-sheet")).toBeNull();

		await wrapper.setProps({ puzzles: [puzzle] });
		expect(document.querySelector(".print-sheet")).not.toBeNull();

		wrapper.unmount();
	});
});
