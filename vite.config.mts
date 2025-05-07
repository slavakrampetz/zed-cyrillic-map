import { sveltePreprocess } from "svelte-preprocess";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import { type UserConfig, defineConfig } from "vite";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Base dir
const __dirname = dirname(fileURLToPath(import.meta.url));

// Config
export default defineConfig(({ command, mode }) => {
	const isProd = mode === "production";

	console.info("example:", command, "at", mode);

	const dist = resolve(__dirname, "./dist");

	// Serve index.html
	if (command === "serve") {
		const devConfig: UserConfig = {
			root: "./",
			base: "/",
			build: {
				minify: false,
				manifest: false,
				target: "esnext",
			},

			server: {
				port: 3001,
			},

			preview: {
				host: "127.0.0.1",
				port: 3001,
			},

			plugins: [
				svelte({
					preprocess: sveltePreprocess({
						scss: true,
						typescript: true,
					}),
				}),
			],
		};

		return devConfig;
	}

	// Build example site
	const buildConfig: UserConfig = {
		root: "./",
		base: "/",
		build: {
			outDir: dist,
			cssCodeSplit: false,
			emptyOutDir: true,
			minify: isProd,
			manifest: false,
			target: "modules",
			rollupOptions: {
				output: {
					assetFileNames: "a/[name].[hash].[ext]",
					entryFileNames: "a/[name].[hash].js",
					preserveModules: false,
				},
			},
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess({
					scss: true,
					typescript: true,
				}),
			}),
		],
	};
	return buildConfig;
});
