module.exports = {
	root: true,
	/* eslint-env  browser, node, es2021 */
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	/* global variable */
	globals: {},
	/* 所配置的解析器 */
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-env'],
		},
		ecmaFeatures: {
			// 是否启用严格模式
			impliedStrict: false,
			// 是否启用jsx
			jsx: true,
		},
	},
	extends: [
		'eslint-config-prettier',
		'eslint:recommended', // 使用推荐的eslint
		'plugin:vue/vue3-recommended', // 使用插件支持vue3
		'plugin:vue/vue3-essential',
		// 1.继承.prettierrc.js文件规则  2.开启rules的 "prettier/prettier": "error"  3.eslint fix的同时执行prettier格式化
		'plugin:prettier/recommended',
	],
	overrides: [],
	/* 插件 */
	plugins: ['vue', 'import'],
	/* 规则 */
	rules: {
		// 生产模式不允许使用log
		'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['error', 'warn'] }] : 'off',
		// 单文件组件是否已多个词汇命名
		'vue/multi-word-component-names': 'off',
	},
}
