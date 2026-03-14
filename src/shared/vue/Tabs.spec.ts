import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Tabs from "./Tabs.vue";

const tabs = [
	{ id: "a", label: "Tab A" },
	{ id: "b", label: "Tab B" },
];

describe("Tabs", () => {
	it("renders tab labels", () => {
		const wrapper = mount(Tabs, { props: { tabs } });
		expect(wrapper.text()).toContain("Tab A");
		expect(wrapper.text()).toContain("Tab B");
	});

	it("emits tab-select when a tab is clicked", async () => {
		const wrapper = mount(Tabs, { props: { tabs, activeTab: tabs[0] } });
		await wrapper.findAll("[role='tab']")[1]!.trigger("click");
		expect(wrapper.emitted("tab-select")?.[0]).toEqual([tabs[1]]);
	});
});
