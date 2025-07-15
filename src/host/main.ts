import { createApp } from "vue";

import "./css/98.css";
import "./css/style.css";

import App from "./App.vue";

import { HTMLDiagram } from "html-diagram";
customElements.define("html-diagram", HTMLDiagram);

createApp(App).mount("#app");
