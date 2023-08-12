import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

export default function createNeedImportAntDesignUi() {
  return Components({
    resolvers: [AntDesignVueResolver()],
  })
}
