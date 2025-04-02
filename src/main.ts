import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { HTMLDiagram } from "html-diagram";
customElements.define("html-diagram", HTMLDiagram);

createApp(App).mount("#app");
