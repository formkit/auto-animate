import { createAutoAnimate } from '@formkit/auto-animate/solid'

function MyList () {
  const [animationParent] = createAutoAnimate()
  return (
    <ul ref={animationParent}>
      {/* 🪄 Magic animations for your list */}
    </ul>
  )
}
