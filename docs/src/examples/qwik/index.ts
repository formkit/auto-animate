export default {
  qwik: {
    language: "jsx",
    ext: "jsx",
    example: `import { useSignal } from '@builder.io/qwik'
import { useAutoAnimate } from '@formkit/auto-animate/qwik'

const App = function () {
  const items = useSignal([0, 1, 2])
  const [parentRef, enableAnimations] = useAutoAnimate(/* optional config */)
  return <>
  <ul ref={parentRef}>
    {items.value.map(
      item => <li key={item}>{ item }</li>
    )}
  </ul>
  <button onClick$={() => (items.value = [...items.value, items.value.length])}>Add number</button>
  <button onClick$={() => enableAnimations(false)}>Disable</button>
</>
}

export default App`,
  },
}
