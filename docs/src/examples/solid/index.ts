export default {
  react: {
    language: "jsx",
    ext: "jsx",
    example: `import { createSignal } from 'solid-js'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

const App = function () {
  const [items, setItems] = createSignal([0, 1, 2])
  const [setParent, enableAnimations] = createAutoAnimate(/* optional config */)
  const add = () => setItems([...items, items.length])
  return <>
  <ul ref={setParent}>
    <For each={items()}>
      {(item) => <li>{item}</li>}
    </For>
  </ul>
  <button onClick={add}>Add number</button>
  <button onClick={() => enableAnimations(false)}>Disable</button>
</>
}

export default App`,
  },
}
