import { ViteSSG } from "vite-ssg"
import { plugin, defaultConfig } from "@formkit/vue"
import App from "./App.vue"
import PageHome from "./pages/PageHome.vue"
import type { RouteRecordRaw } from "vue-router"
import "../assets/main.css"

const routes: RouteRecordRaw[] = [
  { path: "/", component: PageHome },
  { path: "/lists", component: () => import("./pages/PageList.vue") },
  { path: "/tests", component: () => import("./pages/PageTests.vue") },
  {
    path: "/tests-keep-alive",
    component: () => import("./pages/PageTestKeepAlive.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
]

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(plugin, defaultConfig)
})
