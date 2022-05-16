import type { Plugin } from "vue"
import { vAutoAnimate } from "./index"

export const autoAnimatePlugin: Plugin = {
  install(app) {
    app.directive("auto-animate", vAutoAnimate)
  },
}
