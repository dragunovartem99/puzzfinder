import { VueQueryPlugin } from "@tanstack/vue-query";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import App from "../App.vue";

describe("App", () => {
	it("mounts renders properly", () => {
		const wrapper = mount(App, {
			global: { plugins: [VueQueryPlugin] },
		});
		expect(wrapper.text()).toContain("Puzzfinder");
	});
});
