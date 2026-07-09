// JS server entry. Importing page.marko from here (rather than ssrLoadModule-ing the .marko
// directly) is what makes @marko/vite treat it as an entry and inject the browser <script>
// tags so the page resumes on the client -- mirroring @marko/vite's isomorphic dev-server
// fixtures and the marko-query e2e harness.
//
// One page, three routes. The route only varies `mode` (a plain string, safe to pass), which
// the page uses to choose the <auto-animate> options variant (default / plain object / inline
// plugin). render(input) is a Marko 6 async iterable and must be consumed with for-await.

import page from "./page.marko";

const routes = {
  "/": { mode: "default" },
  "/plain-options": { mode: "plain" },
  "/plugin-options": { mode: "plugin" },
};

export async function handler(req, res, next) {
  const pathname = (req.url || "/").split("?")[0];
  const route = routes[pathname];
  if (!route) {
    if (next) next();
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const $global = { serializedGlobals: {} };
  for await (const chunk of page.render({ $global, mode: route.mode })) {
    res.write(chunk);
  }
  res.end();
}
