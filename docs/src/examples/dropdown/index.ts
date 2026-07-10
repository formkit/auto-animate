import vueExample from "./dropdown.vue?raw"
import reactExample from "./dropdown.jsx?raw"
import solidExample from "./dropdown-solid.tsx?raw"
import nativeExample from "./dropdown.html?raw"
import markoExample from "./dropdown.marko?raw"
export default {
  react: {
    language: "jsx",
    ext: "jsx",
    example: reactExample,
  },
  solid: {
    language: "tsx",
    ext: "tsx",
    example: solidExample,
  },
  vue: {
    language: "html",
    ext: "vue",
    example: vueExample,
  },
  marko: {
    language: "marko",
    ext: "marko",
    example: markoExample,
  },
  js: {
    language: "html",
    ext: "html",
    example: nativeExample,
  },
}
