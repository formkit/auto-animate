import vueExample from "./intro.vue?raw"
import reactExample from "./intro.jsx?raw"
import htmlExample from "./intro.html?raw"
import svelteExample from "./intro.svelte?raw"

export default {
  react: {
    example: reactExample,
    ext: "jsx",
    language: "jsx",
  },
  vue: {
    ext: "vue",
    language: "html",
    example: vueExample,
  },
  svelte: {
    example: svelteExample,
    ext: "svelte",
    language: "html",
  },
  js: {
    example: htmlExample,
    ext: "html",
    language: "html",
  },
}
