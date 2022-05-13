import React, { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'

function MyList () {
  const animationParent = useRef(null)

  useEffect(() => {
    autoAnimate(animationParent.current)
  }, parent)

  return (
    <ul ref={animationParent}>
      {/* 🪄 Magic animations for your list */}
    </ul>
  )
}
