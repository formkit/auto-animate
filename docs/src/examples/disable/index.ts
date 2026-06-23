import vueExample from "./disable.vue?raw"
import reactExample from "./disable.jsx?raw"
import markoExample from "./disable.marko?raw"
// import htmlExample from "./disable.html?raw"

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
  marko: {
    ext: "marko",
    language: "html",
    example: markoExample,
  },
  // js: {
  //   example: htmlExample,
  //   ext: "html",
  //   language: "html",
  // },
}
