// Dev SSR server for the auto-animate Marko e2e suite. Modeled on the marko-query e2e server
// (and @marko/vite's own isomorphic dev-server fixtures). Two details the marko-query work
// paid for, and that apply here too:
//   1. It ssrLoadModules the JS entry (src/index.js), which imports the page -- NOT the .marko
//      page directly. Only the JS-entry path gets @marko/vite's server-entry treatment that
//      injects the browser <script> tags; without it the page renders but never resumes.
//   2. Marko 6's render(input) is an async iterable that must be consumed (for-await the
//      chunks, write each, then end). The render(input, res) form does not drive the stream
//      here and the request hangs.
// Unlike the marko-query server, NO resolve.alias / ssr.noExternal is needed: auto-animate's
// core is pulled in by the tag via `client import`, so it is stripped from the server bundle
// entirely; only the client build resolves it, and Vite resolves the TS source normally.
// fs.allow is widened to the workspace root because the page imports the tag from the repo's
// src/ (outside this harness folder).

import { createServer as createHttpServer } from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import url from "node:url";

import { createServer as createViteServer, searchForWorkspaceRoot } from "vite";

const require = createRequire(import.meta.url);
const marko = require("@marko/vite").default;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = 5175;

const devServer = await createViteServer({
  root: __dirname,
  configFile: false,
  appType: "custom",
  logLevel: "warn",
  plugins: [marko()],
  optimizeDeps: { force: true },
  server: {
    ws: false,
    hmr: false,
    middlewareMode: true,
    fs: { allow: [searchForWorkspaceRoot(__dirname)] },
  },
});

devServer.middlewares.use(async (req, res, next) => {
  try {
    const { handler } = await devServer.ssrLoadModule(
      path.join(__dirname, "./src/index.js"),
    );
    await handler(req, res, next);
  } catch (err) {
    devServer.ssrFixStacktrace(err);
    next(err);
  }
});

createHttpServer(devServer.middlewares).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`auto-animate e2e SSR server on http://localhost:${PORT}`);
});
