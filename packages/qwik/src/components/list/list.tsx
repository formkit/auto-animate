import { component$, useStore } from "@builder.io/qwik"
import { useAutoAnimate } from "../../index"

export const List = component$(() => {
  const items = useStore(["one", "two", "three"])

  const [parentRef, setEnabled$] = useAutoAnimate()

  return (
    <>
      <div>
        <button
          onClick$={() => {
            items.push(`${Math.random()}`)
          }}
        >
          Add
        </button>
        <button
          onClick$={() => {
            setEnabled$((v) => !v)
          }}
        >
          Toggle
        </button>
      </div>

      <ul ref={parentRef}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
})
