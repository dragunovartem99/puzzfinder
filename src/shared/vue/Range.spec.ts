import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Range from "./Range.vue";

describe("Range", () => {
	it("renders label and min/max inputs by default", () => {
		const wrapper = mount(Range, { props: { label: "Rating", modelValue: {} } });
		expect(wrapper.text()).toContain("Rating");
		expect(wrapper.find("input[placeholder='Min']").exists()).toBe(true);
		expect(wrapper.find("input[placeholder='Max']").exists()).toBe(true);
	});

	it("emits updated range on min/max input", async () => {
		const wrapper = mount(Range, { props: { label: "Rating", modelValue: {} } });
		await wrapper.find("input[placeholder='Min']").setValue(1200);
		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([{ min: 1200 }]);
	});

	it("switches to exact input on checkbox change", async () => {
		const wrapper = mount(Range, { props: { label: "Rating", modelValue: {} } });
		await wrapper.find("input[type='checkbox']").trigger("change");
		expect(wrapper.find("input[placeholder='Min']").exists()).toBe(false);
		expect(wrapper.findAll("input[type='number']")).toHaveLength(1);
	});

	it("emits equals value on exact input", async () => {
		const wrapper = mount(Range, { props: { label: "Rating", modelValue: {} } });
		await wrapper.find("input[type='checkbox']").trigger("change");
		await wrapper.find("input[type='number']").setValue(1500);
		expect(wrapper.emitted("update:modelValue")?.slice(-1)[0]).toEqual([{ equals: 1500 }]);
	});
});
