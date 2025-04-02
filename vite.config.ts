import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
	base: "./",
	plugins: [
		vue({
			template: { compilerOptions: { isCustomElement: (tag) => tag === "html-diagram" } },
		}),
	],
	resolve: {
		alias: { "@": resolve(__dirname, "src") },
	},
});
