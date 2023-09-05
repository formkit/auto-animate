import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { readFile, writeFile } from "fs/promises"
import { execa } from "execa"
import { execSync } from "child_process"
import chalk from "chalk"
import prompts from "prompts"
import { sync } from "brotli-size"
import prettyBytes from "pretty-bytes"
import { buildModule } from "./build-nuxt"

const info = (m: string) => console.log(chalk.blue(m))
const error = (m: string) => console.log(chalk.red(m))
const success = (m: string) => console.log(chalk.green(m))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(`${__dirname}/../`)
const isPublishing = process.argv[2] === "--publish"

async function clean() {
  await execa("shx", ["rm", "-rf", `${rootDir}/dist`])
}

async function baseBuild() {
  info("Rolling up primary package")
  await execa("npx", ["rollup", "-c", "rollup.config.js"])
}

async function baseBuildMin() {
  info("Minifying primary package")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.js",
    "--environment",
    "MIN:true",
  ])
}

async function reactBuild() {
  info("Rolling up React package")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.js",
    "--environment",
    "FRAMEWORK:react",
  ])
  /**
   * This is a super hack — for some reason these imports need to be explicitly
   * to .mjs files so...we make it so.
   */
  let raw = await readFile(resolve(rootDir, "dist/react/index.mjs"), "utf8")
  raw = raw.replace("from '../index'", "from '../index.mjs'")
  await writeFile(resolve(rootDir, "dist/react/index.mjs"), raw)
}
async function solidBuild() {
  info("Rolling up Solid package")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.js",
    "--environment",
    "FRAMEWORK:solid",
  ])
  /**
   * This is a super hack — for some reason these imports need to be explicitly
   * to .mjs files so...we make it so.
   */
  let raw = await readFile(resolve(rootDir, "dist/solid/index.mjs"), "utf8")
  raw = raw.replace("from '../index'", "from '../index.mjs'")
  await writeFile(resolve(rootDir, "dist/solid/index.mjs"), raw)
}

async function preactBuild() {
  info("Rolling up Preact package")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.js",
    "--environment",
    "FRAMEWORK:preact",
  ])
  /**
   * This is a super hack — for some reason these imports need to be explicitly
   * to .mjs files so...we make it so.
   */
  let raw = await readFile(resolve(rootDir, "dist/preact/index.mjs"), "utf8")
  raw = raw.replace("from '../index'", "from '../index.mjs'")
  await writeFile(resolve(rootDir, "dist/preact/index.mjs"), raw)
}

async function vueBuild() {
  info("Rolling up Vue package")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.js",
    "--environment",
    "FRAMEWORK:vue",
  ])
  /**
   * This is a super hack — for some reason these imports need to be explicitly
   * to .mjs files so...we make it so.
   */
  let raw = await readFile(resolve(rootDir, "dist/vue/index.mjs"), "utf8")
  raw = raw.replace("from '../index'", "from '../index.mjs'")
  await writeFile(resolve(rootDir, "dist/vue/index.mjs"), raw)
}

async function angularBuild() {
  info("Rolling up Angular package")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.js",
    "--environment",
    "FRAMEWORK:angular",
  ])
  /**
   * This is a super hack — for some reason these imports need to be explicitly
   * to .mjs files so...we make it so.
   */
  let raw = await readFile(resolve(rootDir, "dist/angular/index.mjs"), "utf8")
  raw = raw.replace(
    "import autoAnimate from '../index';",
    "import autoAnimate from '../index.mjs';"
  )
  await writeFile(resolve(rootDir, "dist/angular/index.mjs"), raw)
}

// async function qwikBuild() {
//   info("Rolling up Qwik package")
//   await execa("npx", [
//     "rollup",
//     "-c",
//     "rollup.config.js",
//     "--environment",
//     "FRAMEWORK:qwik",
//   ])
//   /**
//    * This is a super hack — for some reason these imports need to be explicitly
//    * to .mjs files so...we make it so.
//    */
//   let raw = await readFile(resolve(rootDir, "dist/qwik/index.mjs"), "utf8")
//   raw = raw.replace("from '../index'", "from '../index.mjs'")
//   await writeFile(resolve(rootDir, "dist/qwik/index.mjs"), raw)
// }

async function nuxtBuild() {
  info("Building nuxt module")
  await buildModule({
    rootDir,
    srcDir: "src/nuxt",
  })
}

async function declarationsBuild() {
  info("Outputting declarations")
  await execa("npx", [
    "rollup",
    "-c",
    "rollup.config.js",
    "--environment",
    "DECLARATIONS:true",
  ])
}

async function bundleDeclarations() {
  info("Bundling declarations")
  await execa("shx", [
    "mv",
    `${rootDir}/dist/src/index.d.ts`,
    `${rootDir}/dist/index.d.ts`,
  ])
  await execa("shx", [
    "mv",
    `${rootDir}/dist/src/react/index.d.ts`,
    `${rootDir}/dist/react/index.d.ts`,
  ])
  await execa("shx", [
    "mv",
    `${rootDir}/dist/src/preact/index.d.ts`,
    `${rootDir}/dist/preact/index.d.ts`,
  ])
  await execa("shx", [
    "mv",
    `${rootDir}/dist/src/solid/index.d.ts`,
    `${rootDir}/dist/solid/index.d.ts`,
  ])
  await execa("shx", [
    "mv",
    `${rootDir}/dist/src/vue/index.d.ts`,
    `${rootDir}/dist/vue/index.d.ts`,
  ])
  await execa("shx", [
    "mv",
    `${rootDir}/dist/src/angular/index.d.ts`,
    `${rootDir}/dist/angular/index.d.ts`,
  ])
  await execa("shx", [
    "mv",
    `${rootDir}/dist/src/qwik/index.d.ts`,
    `${rootDir}/dist/qwik/index.d.ts`,
  ])
  await execa("shx", ["rm", "-rf", `${rootDir}/dist/src`])
  await execa("shx", ["rm", `${rootDir}/dist/index.js`])
}

async function addPackageJSON() {
  info("Writing package.json")
  const raw = await readFile(resolve(rootDir, "package.json"), "utf8")
  const packageJSON = JSON.parse(raw)
  delete packageJSON.private
  delete packageJSON.devDependencies
  delete packageJSON.scripts
  await writeFile(
    resolve(rootDir, "dist/package.json"),
    JSON.stringify(packageJSON, null, 2)
  )
}

async function addAssets() {
  info("Writing readme and license.")
  await execa("shx", [
    "cp",
    `${rootDir}/README.md`,
    `${rootDir}/dist/README.md`,
  ])
  await execa("shx", ["cp", `${rootDir}/LICENSE`, `${rootDir}/dist/LICENSE`])
}

async function prepareForPublishing() {
  info("Preparing for publication")
  if (
    process.env.npm_execpath &&
    !/npm-cli\.js$/.test(process.env.npm_execpath)
  ) {
    error(`⚠️ You must run this command with npm instead of yarn.`)
    info("Please try again with:\n\n» npm run publish\n\n")
    process.exit()
  }
  const isClean = !execSync(`git status --untracked-files=no --porcelain`, {
    encoding: "utf-8",
  })
  if (!isClean) {
    error("Commit your changes before publishing.")
    process.exit()
  }
  const raw = await readFile(resolve(rootDir, "package.json"), "utf8")
  const packageJSON = JSON.parse(raw)
  const response = await prompts([
    {
      type: "confirm",
      name: "value",
      message: `Confirm you want to publish version ${chalk.red(
        packageJSON.version
      )}?`,
      initial: false,
    },
  ])
  if (!response.value) {
    error("Please adjust the version and try again")
    process.exit()
  }
}

async function publish() {
  const raw = await readFile(resolve(rootDir, "package.json"), "utf8")
  const packageJSON = JSON.parse(raw)
  const response = await prompts([
    {
      type: "confirm",
      name: "value",
      message: `Project is build. Ready to publish?`,
      initial: false,
    },
  ])
  if (response.value) {
    execSync("npm publish ./dist")
    execSync(`git tag ${packageJSON.version}`)
    execSync(`git push origin --tags`)
  }
}

async function outputSize() {
  const raw = await readFile(resolve(rootDir, "dist/index.min.js"), "utf8")
  console.log("Brotli size: " + prettyBytes(sync(raw)))
}

async function main() {
  if (isPublishing) await prepareForPublishing()
  await clean()
  await nuxtBuild()
  // await baseBuild()
  // await baseBuildMin()
  // await reactBuild()
  // await preactBuild()
  // await solidBuild()
  // await vueBuild()
  // await angularBuild()
  // // await qwikBuild()
  // await declarationsBuild()
  // await bundleDeclarations()
  // await addPackageJSON()
  // await addAssets()
  // await outputSize()
  isPublishing ? await publish() : success("Build complete")
}

main()
