const solidPrimitive = {
  react: {
    language: "jsx",
    ext: "jsx",
    example: `import { createSignal } from 'solid-js'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

const App = function () {
  const [items, setItems] = createSignal([0, 1, 2])

  let parent;
  createAutoAnimate(() => parent, /* optional config */)

  const add = () => setItems([...items(), items().length])

  return <>
  <ul ref={parent}>
    <For each={items()}>
      {(item) => <li>{item}</li>}
    </For>
  </ul>
  <button onClick={add}>Add number</button>
</>
}

export default App`,
  },
}

const solidDirective = {
  react: {
    language: "jsx",
    ext: "jsx",
    example: `import { createSignal } from 'solid-js'
import { autoAnimate } from '@formkit/auto-animate/solid'

const App = function () {
  // Required to prevent TS from removing the directive
  autoAnimate;

  const [items, setItems] = createSignal([0, 1, 2])

  const add = () => setItems([...items(), items().length])

  return <>
    <ul use:autoAnimate={/* optional config */}>
     <For each={items()}>
      {(item) => <li>{item}</li>}
    </For>
  </ul>
  <button onClick={add}>Add number</button>
</>
}

export default App`,
  },
}

export { solidPrimitive, solidDirective }
