import typescript from "@rollup/plugin-typescript"

const FRAMEWORK = process.env.FRAMEWORK || "index"
const DECLARATIONS = process.env.DECLARATIONS || false

const external = ["vue", "react", "process", "rollup-plugin-terser"]

if (FRAMEWORK) {
  external.push("./index")
}

function createOutput() {
  if (DECLARATIONS) {
    return {
      dir: "./dist",
      format: "esm",
    }
  }
  return {
    file: `./dist/${FRAMEWORK}.mjs`,
    format: "esm",
  }
}

export default {
  external,
  input: `./src/${FRAMEWORK}.ts`,
  output: createOutput(),
  plugins: [
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
  ],
}
