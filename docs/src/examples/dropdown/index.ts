import vueExample from "./dropdown.vue?raw"
import reactExample from "./dropdown.jsx?raw"
import solidExample from "./dropdown-solid.jsx?raw"
import nativeExample from "./dropdown.html?raw"
export default {
  react: {
    language: "jsx",
    ext: "jsx",
    example: reactExample,
  },
  solid: {
    language: "jsx",
    ext: "jsx",
    example: solidExample,
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
