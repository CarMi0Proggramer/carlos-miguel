import vercel from "@astrojs/vercel";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { vite as vidstack } from "vidstack/plugins";

export default defineConfig({
	output: "static",
	// Astro 7 defaults to "jsx" whitespace rules; keep the previous HTML-aware behavior.
	compressHTML: true,
	vite: {
		plugins: [tailwindcss(), vidstack()],
	},
	integrations: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith("media-"),
				},
			},
		}),
	],
	adapter: vercel(),
});
