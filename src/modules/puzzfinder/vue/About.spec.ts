import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import About from "./About.vue";

describe("About", () => {
	it("renders", () => {
		const wrapper = mount(About);
		expect(wrapper.text()).toContain("Discover hidden gems");
	});
});
