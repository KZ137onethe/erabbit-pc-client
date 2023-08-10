module.exports = {
	root: true,
	/* eslint-env  browser, node, es2021 */
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	// global variable
	globals: {},
	/* 所配置的解析器 */
	parser: "@babel/eslint-parser",
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		requireConfigFile: false,
		babelOptions: {
			presets: ["@babel/preset-env"],
		},
		ecmaFeatures: {
			// 是否启用严格模式
			impliedStrict: false,
			// 是否启用jsx
			jsx: true,
		},
	},
	extends: [
		"eslint-config-prettier",
		"eslint:recommended", // 使用推荐的eslint
		"plugin:vue/vue3-recommended", // 使用插件支持vue3
		"plugin:vue/vue3-essential",
		// 1.继承.prettierrc.js文件规则  2.开启rules的 "prettier/prettier": "error"  3.eslint fix的同时执行prettier格式化
		"plugin:prettier/recommended",
	],
	overrides: [],
	/* 插件 */
	plugins: ["vue", "import"],
	/* 规则 */
	rules: {
		"no-console": "off",
		"no-continue": "off",
		"no-restricted-syntax": "off",
		"no-plusplus": [ "error",
			{
				"allowForLoopAfterthoughts": true
			}
		],
		// 是否限制在函数体内对函数形参赋值
		"no-param-reassign": "off",
		"no-shadow": "off",
		"guard-for-in": "off",
		"prettier/prettier": "error",

		// 是否对导入语句中文件扩展名的验证。
		"import/extensions": "off",
		// 是否开启对解析导入路径的验证
		"import/no-unresolved": "off",
		// 检查项目中是否存在未声明为依赖的外部模块导入
		"import/no-extraneous-dependencies": "off",
		// 用于推荐优先使用默认导出（default export）而不是命名导出（named export）
		"import/prefer-default-export": "off",
		// 用于强制导入语句放在非导入语句之前
		"import/first": "warn", // https://github.com/vuejs/vue-eslint-parser/issues/58
		"vue/first-attribute-linebreak": 0,
		// 单文件组件是否已多个词汇命名
		"vue/multi-word-component-names": "off",
		// 当遇到对尚未声明的标识符的引用时，该规则将发出警告。
		"no-use-before-define": [ "error",
			{
        "functions": false,
        "classes": true,
        "variables": true,
        "allowNamedExports": false
			}
		],
		// 因为AxiosCancel必须实例化而能静态化所以加的规则，如果有办法解决可以取消
		"class-methods-use-this": "off",
	},
}
