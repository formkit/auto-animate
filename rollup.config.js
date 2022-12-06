import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

const FRAMEWORK = process.env.FRAMEWORK || "index"
const DECLARATIONS = process.env.DECLARATIONS || false
const MIN = process.env.MIN || false

const external = [
  "vue",
  "preact",
  "react",
  "angular",
  "process",
  "rollup-plugin-terser",
  "../index",
]

function createOutput() {
  if (DECLARATIONS) {
    return {
      dir: "./dist",
      format: "esm",
    }
  }
  return {
    file: `./dist/${FRAMEWORK !== "index" ? FRAMEWORK + "/" : ""}index.${
      MIN ? "min.js" : "mjs"
    }`,
    format: "esm",
  }
}

const plugins = [
  typescript({
    tsconfig: "tsconfig.json",
    compilerOptions: DECLARATIONS
      ? {
          declaration: true,
          emitDeclarationOnly: true,
        }
      : {},
    rootDir: "./",
    outDir: `./dist`,
    include: ["./src/**/*"],
    exclude: ["./docs"],
  }),
]

if (MIN) {
  plugins.push(terser())
}

export default {
  external,
  input: `./src/${FRAMEWORK === "index" ? "" : FRAMEWORK + "/"}index.ts`,
  output: createOutput(),
  plugins,
}
