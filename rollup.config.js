import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

export default {
  input: "./src/index.ts",
  output: {
    dir: "./dist",
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
    terser(),
  ],
}
