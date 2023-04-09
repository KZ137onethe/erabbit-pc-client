// 注册全局自定义组件

export async function getComponent(app) {
	const modules = import.meta.glob('./*.vue')
	// 遍历模块并导入每个模块
	for await (const modulePath of Object.keys(modules)) {
		const module = await modules[modulePath]()
		const moduleName = module.default.name
		// 使用导入的模块...
		app.component(moduleName, module)
	}
}
