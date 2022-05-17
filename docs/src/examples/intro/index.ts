import vueExample from "./intro.vue?raw"
import reactExample from "./intro.jsx?raw"
import htmlExample from "./intro.html?raw"

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
  js: {
    example: htmlExample,
    ext: "html",
    language: "html",
  },
}
