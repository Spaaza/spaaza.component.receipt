import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: "src/index.ts",
			formats: ["iife"],
			name: "SpaazaReceipt",
			fileName: () => "spaaza-receipt.js",
		},
		outDir: "dist",
		sourcemap: true,
	},
});
