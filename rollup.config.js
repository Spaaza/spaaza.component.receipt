import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import cleanCSS from "less-plugin-clean-css";
import less from "rollup-plugin-less";
import json from "@rollup/plugin-json";
import typescript from "typescript";
import tsc from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

const pkg = require("./package.json");

export default [
	{
		input: "src/index.tsx",
		output: {
			file: pkg.main,
			format: "iife",
			name: "SpaazaReceipt",
			sourcemap: true,
		},
		plugins: [
			resolve(),
			commonjs(),
			less({
				output: css => css,
				plugins: [
					new cleanCSS()
				]
			}),
			json({
				include: 'src/lang/**',
			}),
			tsc({
				typescript: typescript,
				include: ["src/**/*.ts", "src/**/*.tsx"]
			}),
			uglify({ mangle: true }),
		]
	},
];
