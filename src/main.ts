import { createApp } from "vue";
import App from "./App.vue";
import "./98.css";

import { HTMLDiagram } from "html-diagram";
customElements.define("html-diagram", HTMLDiagram);

createApp(App).mount("#app");
