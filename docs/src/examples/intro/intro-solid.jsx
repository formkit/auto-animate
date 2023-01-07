import { createAutoAnimate } from '@formkit/auto-animate/solid'

function MyList () {
  let animationParent;

  createAutoAnimate(() => animationParent, /* optional config */)

  return (
    <ul ref={animationParent}>
      {/* 🪄 Magic animations for your list */}
    </ul>
  )
}
