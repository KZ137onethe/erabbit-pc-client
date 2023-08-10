/** .prettierrc.js
 * 在VSCode中安装prettier插件 打开插件配置填写`.prettierrc.js` 将本文件作为其代码格式化规范
 * 在本文件中修改格式化规则，不会同时触发改变ESLint代码检查，所以每次修改本文件需要重启VSCode，ESLint检查才能同步代码格式化
 * 需要相应的代码格式化规范请自行查阅配置，下面为默认项目配置
 */
module.exports = {
    // 一行最多多少个字符
    printWidth: 150,
    // 指定每个缩进级别的空格数
    tabWidth: 2,
    // 使用制表符而不是空格缩进行
    useTabs: true,
    // 在语句末尾是否需要分号
    semi: false,
    // 是否使用单引号
    singleQuote: false,
    // jsx中使用单引号
    jsxSingleQuote: true,
    // 仅在必需时为对象的key添加引号
    quoteProps: 'as-needed',
    // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
    trailingComma: 'all',
// 在对象前后添加空格-eg: { foo: bar }

    bracketSpacing: true,
    // 将多行HTML（HTML、JSX、Vue、Angular）元素的>单独放在下一行（不适用于自关闭元素）
    bracketLine: false,
    // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
    arrowParens: 'always',
// 是否限制为仅格式化在文件顶部包含特殊注释（称为杂注）的文件

    requirePragma: false,
    insertPragma: false,
    //  如果超过打印宽度，则换行。
    proseWrap: 'always',
    // 指定HTML文件的全局空格敏感度 css\strict\ignore
    htmlWhitespaceSensitivity: 'css',
    // Vue文件脚本和样式标签缩进
    vueIndentScriptAndStyle: false,
    //在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
    //然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
    //对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
    // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
    endOfLine: 'lf',
    //对引用代码进行格式化
    embeddedLanguageFormatting: "auto",
};
