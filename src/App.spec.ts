import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

describe("App", () => {
	it("mounts renders properly", () => {
		const wrapper = mount(App, {
			global: { plugins: [VueQueryPlugin] },
		});
		expect(wrapper.text()).toContain("Puzzfinder");
	});
});
