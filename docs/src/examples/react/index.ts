export default {
  react: {
    language: "jsx",
    ext: "jsx",
    example: `import { useState } from 'react'
import useAutoAnimate from '@formkit/auto-animate/react'

const App = function () {
  const [items, setItems] = useState([0, 1, 2])
  const parent = useAutoAnimate(/* optional config */)

  return <>
  <ul ref={parent}>
    {items.map(
      item => <li key={item}>{{ item }}</li>
    )}
  </ul>
  <button onClick={setItems([...items, items.length])}>Add number</button>
</>
}`,
  },
}
