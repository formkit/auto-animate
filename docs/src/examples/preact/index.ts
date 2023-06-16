export default {
  preact: {
    language: "jsx",
    ext: "jsx",
    example: `import { useState } from 'preact/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/preact'

const App = function () {
  const [items, setItems] = useState(["🎁", "📦", "🚚", "💪", "🐽", "🐸", "🐻", "🪱", "🪳"])
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)


  useEffect(() => {
    setInterval(() => {
      setItems(items.unshift(items.pop()))
    }, 500)
  }, [])

  return <>
  <ul ref={parent}>
    {items.map(
      item => <li key={item}>{ item }</li>
    )}
  </ul>
</>
}

export default App`,
  },
}
