import typescript from "@rollup/plugin-typescript"
import { env } from "process"
import { terser } from "rollup-plugin-terser"

const FRAMEWORK = process.env.FRAMEWORK || "index"

const external = ["vue", "react"]

if (FRAMEWORK) {
  external.push("./index")
}

export default {
  external,
  input: `./src/${FRAMEWORK}.ts`,
  output: {
    file: `./dist/${FRAMEWORK}.mjs`,
    format: "esm",
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      rootDir: "./",
      outDir: `./dist`,
      include: ["./src/**/*"],
      exclude: ["./docs"],
    }),
    // terser(),
  ],
}
