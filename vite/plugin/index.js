import vue from '@vitejs/plugin-vue'
import createNeedImportAntDesignUi from './need-import-ant-design'
import createVueJsx from './vue-jsx'
import createSvgIcon from './svg-icon'

export default function createVitePlugins() {
	const vitePlugins = [vue()]
	vitePlugins.push(createNeedImportAntDesignUi())
	vitePlugins.push(createVueJsx())
	vitePlugins.push(createSvgIcon())
	return vitePlugins
}
