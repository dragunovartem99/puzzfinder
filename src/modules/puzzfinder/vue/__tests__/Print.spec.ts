import { mount } from "@vue/test-utils";
import { beforeEach, describe, it, expect } from "vitest";

import { useFavorites } from "@/shared";

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
	beforeEach(() => useFavorites().clear());

	it("shows the favorites count", async () => {
		const wrapper = mount(Print);
		useFavorites().toggle(puzzle);
		await wrapper.vm.$nextTick();

		expect(wrapper.find("button").text()).toBe("Print (1)");
	});

	it("only renders the print sheet when there are favorites", async () => {
		const wrapper = mount(Print, { attachTo: document.body });
		expect(document.querySelector(".print-sheet")).toBeNull();

		useFavorites().toggle(puzzle);
		await wrapper.vm.$nextTick();
		expect(document.querySelector(".print-sheet")).not.toBeNull();

		wrapper.unmount();
	});
});
