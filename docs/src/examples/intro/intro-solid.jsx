import { useAutoAnimate } from '@formkit/auto-animate/solid'

function MyList () {
  let animationParent;

  useAutoAnimate(() => animationParent, /* optional config */)

  return (
    <ul ref={animationParent}>
      {/* 🪄 Magic animations for your list */}
    </ul>
  )
}
