import { mount } from "@vue/test-utils";
import { beforeEach, describe, it, expect } from "vitest";

import { useFolders } from "@/shared";

import Folders from "../Folders.vue";

describe("Folders", () => {
	beforeEach(() => useFolders().reset());

	it("lists folders with counts and selects on click", async () => {
		const { create, select, folders } = useFolders();
		create("Lesson", ["a", "b"]);
		select(folders.value[0]!.id);
		const wrapper = mount(Folders, { props: { puzzles: [] } });

		const links = wrapper.findAll(".tree-view a");
		expect(links.map((link) => link.text())).toEqual(["Favorites (0)", "Lesson (2)"]);
		expect(links[0]!.attributes("aria-current")).toBe("true");

		await links[1]!.trigger("click");
		expect(useFolders().selected.value.name).toBe("Lesson");
	});

	it("renames the selected folder from the text box", async () => {
		const wrapper = mount(Folders, { props: { puzzles: [] } });

		await wrapper.find("input[type=text]").setValue("Tactics");
		await wrapper.find("form").trigger("submit");

		expect(useFolders().selected.value.name).toBe("Tactics");
	});
});
