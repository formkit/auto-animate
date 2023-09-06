import createJITI from "jiti"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const __filename = fileURLToPath(import.meta.url)

const jiti = createJITI(__filename, {
  esmResolve: true,
})

jiti("./bundle.ts")
