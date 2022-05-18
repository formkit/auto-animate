import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import fs from "fs/promises"
import { execa } from "execa"
import { execSync } from "child_process"
import chalk from "chalk"
import prompts from "prompts"

const info = (m) => console.log(chalk.blue(m))
const error = (m) => console.log(chalk.red(m))
const success = (m) => console.log(chalk.green(m))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname)
const isPublishing = process.argv[2] === "--publish"

async function clean() {
  await execa("rm", ["-rf", `${rootDir}/dist`])
}

async function baseBuild() {
  info("Rolling up primary package")
  await execa("npx", ["rollup", "-c", "rollup.config.js"])
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
  let raw = await fs.readFile(resolve(rootDir, "dist/react/index.mjs"), "utf8")
  raw = raw.replace(
    "import autoAnimate from '../index';",
    "import autoAnimate from '../index.mjs';"
  )
  await fs.writeFile(resolve(rootDir, "dist/react/index.mjs"), raw)
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
  let raw = await fs.readFile(resolve(rootDir, "dist/vue/index.mjs"), "utf8")
  raw = raw.replace(
    "import autoAnimate from '../index';",
    "import autoAnimate from '../index.mjs';"
  )
  await fs.writeFile(resolve(rootDir, "dist/vue/index.mjs"), raw)
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
  await execa("mv", [
    `${rootDir}/dist/src/index.d.ts`,
    `${rootDir}/dist/index.d.ts`,
  ])
  await execa("mv", [
    `${rootDir}/dist/src/react/index.d.ts`,
    `${rootDir}/dist/react/index.d.ts`,
  ])
  await execa("mv", [
    `${rootDir}/dist/src/vue/index.d.ts`,
    `${rootDir}/dist/vue/index.d.ts`,
  ])
  await execa("rm", ["-rf", `${rootDir}/dist/src`])
  await execa("rm", [`${rootDir}/dist/index.js`])
}

async function addPackageJSON() {
  info("Writing package.json")
  const raw = await fs.readFile(resolve(rootDir, "package.json"), "utf8")
  const packageJSON = JSON.parse(raw)
  delete packageJSON.private
  delete packageJSON.devDependencies
  delete packageJSON.scripts
  await fs.writeFile(
    resolve(rootDir, "dist/package.json"),
    JSON.stringify(packageJSON, null, 2)
  )
}

async function addAssets() {
  info("Writing readme and license.")
  await execa("cp", [`${rootDir}/README.md`, `${rootDir}/dist/README.md`])
  await execa("cp", [`${rootDir}/LICENSE`, `${rootDir}/dist/LICENSE`])
}

async function prepareForPublishing() {
  info("Preparing for publication")
  if (!/npm-cli\.js$/.test(process.env.npm_execpath)) {
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
  const raw = await fs.readFile(resolve(rootDir, "package.json"), "utf8")
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
  const response = await prompts([
    {
      type: "confirm",
      name: "value",
      message: `Project is build. Ready to publish?`,
      initial: false,
    },
  ])
  if (response.value) {
    execSync("npm publish ./dist --dry-run")
  }
}

if (isPublishing) await prepareForPublishing()
await clean()
await baseBuild()
await reactBuild()
await vueBuild()
await declarationsBuild()
await bundleDeclarations()
await addPackageJSON()
await addAssets()
isPublishing ? await publish() : success("Build complete")
