import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import PageHome from "./pages/PageHome.vue"
import PageList from "./pages/PageList.vue"
import PageTests from "./pages/PageTests.vue"
import type { RouteRecordRaw } from "vue-router"
import "../assets/main.css"

const routes: RouteRecordRaw[] = [
  { path: "/", component: PageHome },
  { path: "/lists", component: PageList },
  { path: "/tests", component: PageTests },
]

export const createApp = ViteSSG(App, { routes }, (app) => {})
