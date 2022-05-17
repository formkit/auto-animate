import vueExample from "./dropdown.vue?raw"
import reactExample from "./dropdown.jsx?raw"
import nativeExample from "./dropdown.html?raw"
export default {
  react: {
    language: "jsx",
    ext: "jsx",
    example: reactExample,
  },
  vue: {
    language: "html",
    ext: "vue",
    example: vueExample,
  },
  js: {
    language: "html",
    ext: "html",
    example: nativeExample,
  },
}
