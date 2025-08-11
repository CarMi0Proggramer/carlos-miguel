import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";
import vue from "@astrojs/vue";
import { vite as vidstack } from "vidstack/plugins";

export default defineConfig({
	output: "static",
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
