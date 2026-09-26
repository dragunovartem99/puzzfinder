import { VueQueryPlugin } from "@tanstack/vue-query";
import { HTMLDiagram } from "html-diagram";
import { createApp } from "vue";

import "99.css";

import App from "./App.vue";
customElements.define("html-diagram", HTMLDiagram);

createApp(App).use(VueQueryPlugin).mount("#app");
