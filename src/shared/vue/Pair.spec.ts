import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Pair from "./Pair.vue";

describe("Pair", () => {
	it("renders label and slot content", () => {
		const wrapper = mount(Pair, {
			props: { label: "Rating:" },
			slots: { default: "1500" },
		});
		expect(wrapper.text()).toContain("Rating:");
		expect(wrapper.text()).toContain("1500");
	});
});
