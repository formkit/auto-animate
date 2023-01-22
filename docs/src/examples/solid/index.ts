const solidPrimitive = {
  solid: {
    language: "tsx",
    ext: "tsx",
    example: `import { createSignal, For, Show } from "solid-js"
import { createAutoAnimate } from "@formkit/auto-animate/solid"

const App = function () {
  let parent: HTMLDivElement
  createAutoAnimate(() => parent, /* optional config */)

  const menuItems = ["Home", "Settings", "Logout"]
  const [isExpanded, setIsExpanded] = createSignal(true)

  return <div class="parent" ref={parent}>
    <Show keyed when={isExpanded()}>
      <ul class="drawer">
        <For each={menuItems}>
          {item => <li class="item">{item}</li>}
        </For>
      </ul>
    </Show>
    <div class="content">
      <button
        class="button button--alt"
        type="button"
        onClick={() => setIsExpanded(isExpanded => !isExpanded)}
      >
        Toggle Drawer
      </button>
    </div>
  </div>
}

export default App
`,
  },
}

const solidDirective = {
  solid: {
    language: "tsx",
    ext: "tsx",
    example: `import { createSignal } from 'solid-js'
import { autoAnimate } from '@formkit/auto-animate/solid'

const App = function () {
  // Required to prevent TS from removing the directive
  autoAnimate;

  const menuItems = ["Home", "Settings", "Logout"]
  const [isExpanded, setIsExpanded] = createSignal(true)

  return <div use:autoAnimate={/* optional config */} class="parent">
    <Show keyed when={isExpanded()}>
      <ul class="drawer">
        <For each={menuItems}>
          {item => <li class="item">{item}</li>}
        </For>
      </ul>
    </Show>
    <div class="content">
      <button
        class="button button--alt"
        type="button"
        onClick={() => setIsExpanded(isExpanded => !isExpanded)}
      >
        Toggle Drawer
      </button>
    </div>
  </div>
</>
}

export default App`,
  },
}

export { solidPrimitive, solidDirective }
