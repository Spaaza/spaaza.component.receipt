import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import cleanCSS from "less-plugin-clean-css";
import less from "rollup-plugin-less";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
	input: "src/index.tsx",
	output: {
		file: "dist/spaaza-receipt.js",
		format: "iife",
		name: "SpaazaReceipt",
		sourcemap: true,
	},
	plugins: [
		resolve(),
		commonjs(),
		less({
			output: css => css,
			plugins: [new cleanCSS()],
		}),
		json({
			include: "src/lang/**",
		}),
		typescript(),
		terser(),
	],
};
