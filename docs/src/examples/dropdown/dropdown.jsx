import React, { useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'

const dropdown = () => {
  const [show, setShow] = useState(false)
  const dropdown = useRef(null)

  useEffect(() => {
    autoAnimate(animationParent.current)
  }, parent)

  const reveal = () => setShow(!show)

  return <div ref={dropdown}>
    <strong class="dropdown-label" onClick={reveal}>My Dropdown</strong>
    { show && <p class="dropdown-content" >Lorum ipsum...</p> }
  </div>
}
