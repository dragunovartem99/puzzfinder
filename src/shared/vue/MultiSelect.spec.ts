import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MultiSelect from "./MultiSelect.vue";

const groups = [
	{
		label: "Group 1",
		options: [
			{ key: "a", label: "Option A" },
			{ key: "b", label: "Option B" },
		],
	},
];

describe("MultiSelect", () => {
	it("renders options", () => {
		const wrapper = mount(MultiSelect, {
			props: { groups, modelValue: [] },
		});
		expect(wrapper.text()).toContain("Option A");
		expect(wrapper.text()).toContain("Option B");
	});

	it("updates model on change", async () => {
		const wrapper = mount(MultiSelect, {
			props: { groups, modelValue: [] },
		});
		const select = wrapper.find("select").element as HTMLSelectElement;
		select.options[0]!.selected = true;
		await wrapper.find("select").trigger("change");
		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["a"]]);
	});
});
