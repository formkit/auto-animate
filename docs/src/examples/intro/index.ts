import vueExample from "./intro.vue?raw"
import reactExample from "./intro.jsx?raw"
import preactExample from "./intro-preact.jsx?raw"
import solidExample from "./intro-solid.jsx?raw"
import htmlExample from "./intro.html?raw"
import svelteExample from "./intro.svelte?raw"
import angularExample from "./intro.angular?raw"
import markoExample from "./intro.marko?raw"

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
  solid: {
    example: solidExample,
    ext: "jsx",
    language: "jsx",
  },
  preact: {
    example: preactExample,
    ext: "jsx",
    language: "jsx",
  },
  svelte: {
    example: svelteExample,
    ext: "svelte",
    language: "html",
  },
  angular: {
    example: angularExample,
    ext: "angular",
    language: "html",
  },
  marko: {
    example: markoExample,
    ext: "marko",
    language: "html",
  },
  js: {
    example: htmlExample,
    ext: "html",
    language: "html",
  },
}
