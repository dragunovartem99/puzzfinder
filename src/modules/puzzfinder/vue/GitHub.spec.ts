import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GitHub from "./GitHub.vue";

describe("GitHub", () => {
	it("renders all three repository links", () => {
		const wrapper = mount(GitHub);
		const links = wrapper.findAll("a");
		expect(links).toHaveLength(3);
		expect(wrapper.text()).toContain("Client-side web interface");
		expect(wrapper.text()).toContain("Application programming interface");
		expect(wrapper.text()).toContain("DuckDB database with chess puzzles");
	});
});
