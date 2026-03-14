import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Window from "./Window.vue";

describe("Window", () => {
	it("renders title", () => {
		const wrapper = mount(Window, {
			props: { window: { title: "My Window" } },
		});
		expect(wrapper.text()).toContain("My Window");
	});

	it("emits close when close button is clicked", async () => {
		const wrapper = mount(Window, {
			props: { window: { title: "Test", controls: { close: true } } },
		});
		await wrapper.find("button[aria-label='Close']").trigger("click");
		expect(wrapper.emitted("close")).toHaveLength(1);
	});
});
