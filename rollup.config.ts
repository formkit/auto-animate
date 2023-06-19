import typescript from "@rollup/plugin-typescript"
import { qwikRollup } from "@builder.io/qwik/optimizer"
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
  "solid-js",
  "rollup-plugin-terser",
  "../index",
  "../index.ts",
]

function createOutput() {
  if (DECLARATIONS) {
    return {
      dir: "./dist",
      format: "esm",
    }
  }
  if (FRAMEWORK === "qwik") {
    return {
      dir: "./dist/qwik",
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
    outDir: `./dist${FRAMEWORK === "qwik" ? "/qwik" : ""}`,
    include: DECLARATIONS
      ? [`./src/**/*`]
      : [`./src/${FRAMEWORK}/index.ts`, "./src/index.ts"],
    exclude: ["./docs"],
  }),
]

if (FRAMEWORK === "qwik") {
  plugins.push(
    qwikRollup({
      target: "lib",
      forceFullBuild: true,
      buildMode: "production",
      debug: false,
      entryStrategy: { type: "inline" },
      srcDir: "./src/qwik",
    })
  )
}

if (MIN) {
  plugins.push(terser())
}

export default {
  external,
  input: `./src/${FRAMEWORK === "index" ? "" : FRAMEWORK + "/"}index.ts`,
  output: createOutput(),
  plugins,
}
