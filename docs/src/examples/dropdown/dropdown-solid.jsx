import { useAutoAnimate } from "@formkit/auto-animate/solid"
import { createSignal, Show } from "solid-js"

const Dropdown = () => {

  const [show, setShow] = createSignal(false)
  const reveal = () => setShow(!show)

  let parent

  useAutoAnimate(() => parent /* optional config */)

  return <div ref={parent}>
    <strong className="dropdown-label" onClick={reveal}>Click me to open!</strong>
    <Show when={show()} keyed>
      <p className="dropdown-content">Lorum ipsum...</p>
    </Show>
  </div>
}

export default Dropdown
