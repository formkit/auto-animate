export default {
  marko: {
    language: "html",
    ext: "marko",
    example: `import AutoAnimate from "@formkit/auto-animate/marko"

<let/items = [0, 1, 2]>
<let/enabled = true>

<ul/listRef>
  <for|item| of=items by=(n => String(n))>
    <li>\${item}</li>
  </for>
</ul>
<AutoAnimate parent=listRef enabled=enabled/>

<button onClick() { items = [...items, items.length] }>Add number</button>
<button onClick() { enabled = false }>Disable</button>`,
  },
}