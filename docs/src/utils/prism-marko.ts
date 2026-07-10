/**
 * A lightweight Prism grammar for Marko 6's concise syntax, covering what the
 * docs examples use: module statements, tag variables (<ul/listRef>), tag
 * parameters (<for|item|), unquoted/parenthesized attribute expressions
 * (by=(a => a), options=({ duration: 500 })), attribute method shorthand
 * (onClick() { ... }), ${} interpolation, and <script> blocks. Prism itself is
 * loaded globally from the CDN (see docs/index.html), so this only registers
 * the grammar in the browser.
 */
export function registerMarko(): void {
  if (typeof window === "undefined") return
  const Prism = (window as any).Prism
  if (!Prism || Prism.languages.marko) return

  const js = Prism.languages.javascript

  // An attribute/tag-variable value expression. Alternatives, in order:
  // quoted strings, template strings, parens (2 levels deep), arrays,
  // objects, then a bare unquoted expression (listRef, false, 100ms…).
  const EXPR =
    /(?:"[^"]*"|'[^']*'|`(?:[^`\\]|\\[\s\S])*`|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)|\[(?:[^[\]]|\[[^[\]]*\])*\]|\{(?:[^{}]|\{[^{}]*\})*\}|[^\s/>]+)/
      .source

  // Attribute method shorthand: onClick(evt) { ... } (braces 2 levels deep).
  const METHOD = /\(\s*[^()]*\)\s*\{(?:[^{}]|\{[^{}]*\})*\}/.source

  Prism.languages.marko = {
    comment: [
      { pattern: /<!--[\s\S]*?-->/, greedy: true },
      { pattern: /^[ \t]*\/\/.*/m, greedy: true },
    ],
    // import/export/static/client statements at the top of a template.
    "module-statement": {
      pattern: /^[ \t]*(?:import|export|static|client)\b.*/m,
      inside: js,
    },
    // <script> body is plain JavaScript.
    script: {
      pattern: /(<script[^>]*>)[\s\S]*?(?=<\/script>)/,
      lookbehind: true,
      greedy: true,
      inside: js,
    },
    // ${expression} in body text.
    interpolation: {
      pattern: /\$\{(?:[^{}]|\{[^{}]*\})*\}/,
      greedy: true,
      inside: {
        "interpolation-punctuation": {
          pattern: /^\$\{|\}$/,
          alias: "punctuation",
        },
        rest: js,
      },
    },
    tag: {
      pattern: new RegExp(
        "</?[a-zA-Z][\\w.$-]*" + // tag or component name
          "(?:/[\\w$]+)?" + // tag variable: <ul/listRef>
          "(?:\\|[^|]*\\|)?" + // tag parameters: <for|item|
          "(?:\\s*=\\s*" + // direct value: <if=show>, <let/x = v>
          EXPR +
          ")?" +
          "(?:\\s+[@\\w$-]+" + // attribute name
          "(?:" +
          METHOD +
          ")?" + // method shorthand
          "(?:\\s*=\\s*" +
          EXPR +
          ")?" + // attribute value
          ")*" +
          "\\s*/?>"
      ),
      greedy: true,
      inside: {
        "attr-method": {
          pattern: new RegExp("([\\s])[@\\w$-]+" + METHOD),
          lookbehind: true,
          inside: {
            "attr-name": /^[@\w$-]+/,
            rest: js,
          },
        },
        "attr-value": {
          pattern: new RegExp("=\\s*" + EXPR),
          inside: {
            punctuation: { pattern: /^=/, alias: "attr-equals" },
            rest: js,
          },
        },
        tag: {
          pattern: /^<\/?[a-zA-Z][\w.$-]*/,
          inside: {
            punctuation: /^<\/?/,
            "class-name": /^[A-Z][\w$]*$/,
          },
        },
        "tag-variable": {
          pattern: /\/[\w$]+/,
          alias: "variable",
          inside: { punctuation: /^\// },
        },
        "tag-params": {
          pattern: /\|[^|]*\|/,
          alias: "variable",
          inside: { punctuation: /^\||\|$/ },
        },
        "attr-name": /[@\w$-]+/,
        punctuation: /\/?>/,
      },
    },
    entity: /&[\da-z]{1,8};/i,
  }
}
