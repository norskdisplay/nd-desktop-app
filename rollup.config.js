// Thanks to https://github.com/PolymerLabs/lit-html-build/blob/master/package.json
/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';

const babelConfig = {
	babelrc: false,
	...{
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						ie: '11',
					},
				},
			],
		],
	},
};

const terserConfig = {
	output: {
		comments: function (_, comment) {
			const text = comment.value;
			const type = comment.type;
			if (type == 'comment2') {
				// multiline comment
				return /@preserve|@license|@cc_on/i.test(text);
			}
		},
	},
};

const copyConfig = {
	targets: [
		{ src: 'node_modules/@webcomponents', dest: 'dist/node_modules' }
	],
};

const configs = [
	{
		input: 'src/frontend/index.ts',
		output: {
			file: 'dist/bundle.js',
			format: 'iife',
			sourcemap: true
		},
		plugins: [typescript({
			tsconfig: "./tsconfig-frontend.json"
		}), minifyHTML(), babel(babelConfig), resolve(), copy(copyConfig)],
	},
	{
		input: 'src/frontend/polyfills.ts',
		output: {
			file: 'dist/polyfills.js',
			format: 'iife',
		},
		plugins: [typescript({
			tsconfig: "./tsconfig-frontend.json"
		}), commonjs({ include: ['node_modules/**'] }), resolve()],
	},
];

for (const config of configs) {
	if (process.env.NODE_ENV !== 'development') {
		config.plugins.push(terser(terserConfig));
	}
}

export default configs;