<script setup lang="ts">
import { ref, type Component } from "vue";
import { Desktop, Puzzfinder } from "@/modules";
import type { UI } from "./shared";

const activeWindow = ref<UI.AppWindow["id"] | null>("puzzfinder");

const windows: Record<UI.AppWindow["id"], Component> = {
	puzzfinder: Puzzfinder,
};
</script>

<template>
	<Desktop @shortcut-click="(windowID) => (activeWindow = windowID)" />
	<template v-for="(window, windowID) in windows">
		<component
			:is="window"
			v-if="activeWindow === windowID"
			@close="activeWindow = null"
			class="active-window"
		/>
	</template>
</template>

<style>
@font-face {
	font-family: "Diagram Smart";
	src: url("/DiagramSmart.woff2") format("woff2");
}

:root {
	--diagram-font: "Diagram Smart";
}

* {
	box-sizing: border-box;
}

body {
	margin: 0;
	--ui-scale: 1.5;
}

.active-window {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 1440px;
	height: 90dvh;
}
</style>
