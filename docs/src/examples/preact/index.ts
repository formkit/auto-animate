export default {
  preact: {
    language: "jsx",
    ext: "jsx",
    example: `import { useState } from 'preact/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/preact'

const App = function () {
  const [items, setItems] = useState(["🎁", "📦", "🚚", "💪", "🐽", "🐸", "🐻", "🪱", "🪳"])
  const [parent] = useAutoAnimate(/* optional config */)

  function cycle() {
    items.unshift(items.pop())
    setItems(items)
  }

  return <>
  <ul ref={parent}>
    {items.map(
      item => <li key={item}>{ item }</li>
    )}
  </ul>
  <button onClick={cycle}>Cycle Emoji</button>
</>
}

export default App`,
  },
}
