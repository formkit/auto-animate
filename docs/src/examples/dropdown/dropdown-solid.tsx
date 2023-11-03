import { createAutoAnimate } from "@formkit/auto-animate/solid"
import { createSignal, Show } from "solid-js"

const Dropdown = () => {
  const [show, setShow] = createSignal(false)
  const reveal = () => setShow(!show())

  const [parent, setEnabled] = createAutoAnimate(/* optional config */)

  return (
    <div ref={parent}>
      <strong class="dropdown-label" onClick={reveal}>
        Click me to open!
      </strong>
      <Show when={show()} keyed>
        <p class="dropdown-content">Lorum ipsum...</p>
      </Show>
    </div>
  )
}

export default Dropdown
