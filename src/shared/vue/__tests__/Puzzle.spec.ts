import { mount } from "@vue/test-utils";
import { beforeEach, describe, it, expect } from "vitest";

import { useFolders } from "../../composables/useFolders";
import Puzzle from "../Puzzle.vue";

const puzzle = {
	id: "abc",
	fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
	url: "https://lichess.org/training/abc",
	flipped: false,
	rating: 1500,
	length: "Short (2)",
	solution: "1. e5",
	positions: [
		"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
		"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
	],
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

	it("starts at the first move", () => {
		const wrapper = mount(Puzzle, { props: { puzzle } });

		expect(wrapper.find("html-diagram").attributes("fen")).toBe(puzzle.positions[0]);
		expect(wrapper.find('[aria-label="Previous move"]').attributes("disabled")).toBeDefined();
	});

	it("steps through the solution", async () => {
		const wrapper = mount(Puzzle, { props: { puzzle } });
		const diagram = () => wrapper.find("html-diagram").attributes("fen");

		await wrapper.find('[aria-label="Next move"]').trigger("click");
		expect(diagram()).toBe(puzzle.positions[1]);
		expect(wrapper.find('[aria-label="Next move"]').attributes("disabled")).toBeDefined();

		await wrapper.find('[aria-label="First move"]').trigger("click");
		expect(diagram()).toBe(puzzle.positions[0]);

		await wrapper.find('[aria-label="Last move"]').trigger("click");
		expect(diagram()).toBe(puzzle.positions[1]);
	});
});

describe("Puzzle heart", () => {
	beforeEach(() => useFolders().reset());

	it("toggles the only folder from the title bar", async () => {
		const wrapper = mount(Puzzle, { props: { puzzle } });
		const heart = () => wrapper.find(".title-bar-controls .favorite");

		expect(heart().attributes("aria-pressed")).toBe("false");

		await heart().trigger("click");
		expect(heart().attributes("aria-pressed")).toBe("true");
		expect(useFolders().selected.value.puzzles).toEqual(["abc"]);

		await heart().trigger("click");
		expect(heart().attributes("aria-pressed")).toBe("false");
	});

	it("opens a folder menu when there are several folders", () => {
		useFolders().create("Second");
		const wrapper = mount(Puzzle, { props: { puzzle }, attachTo: document.body });
		const heart = wrapper.find(".title-bar-controls .favorite");

		expect(heart.attributes("popovertarget")).toBe("folder-menu-abc");
		expect(document.querySelector("body > .folder-menu")?.getAttribute("popover")).toBe("auto");
		const boxes = document.querySelectorAll("body > .folder-menu input[type=checkbox]");
		expect(boxes).toHaveLength(2);

		boxes[1]?.dispatchEvent(new Event("change"));
		expect(useFolders().isSaved("abc")).toBe(true);
		wrapper.unmount();
	});

	it("removes from the given folder directly", async () => {
		const { create, toggle, has } = useFolders();
		create("Second");
		const folderId = useFolders().folders.value[0]!.id;
		toggle({ folderId, puzzleId: "abc" });
		const wrapper = mount(Puzzle, { props: { puzzle, folderId } });

		await wrapper.find(".favorite").trigger("click");
		expect(has({ folderId, puzzleId: "abc" })).toBe(false);
	});
});
