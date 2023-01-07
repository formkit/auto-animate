import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { createEffect, createSignal, Show } from "solid-js"

function Juggle() {
  const [balls, setBalls] = createSignal(['red', 'green', 'blue'])
  const [isEnabled, setIsEnabled] = createSignal(true)
  const [parent, enable] = createAutoAnimate({ duration: 500 })
  function toggle () {
    enable(!isEnabled)
    setIsEnabled(!isEnabled)
  }

  createEffect(() => {
    setTimeout(() => {
      const juggled = [...balls]
      juggled.push(juggled.shift())
      setBalls(juggled)
    }, 600)
  } )

  return (
    <>
      <ul ref={parent} className="balls">
        { balls.map(color => <li key={color} className={color}>{ color }</li>) }
      </ul>
      <button onClick={toggle}>
        <Show when={isEnabled()} fallback="✅ Enable">
        🚫 Disable
        </Show>
        animations
      </button>
    </>
  )
}

export default Juggle
