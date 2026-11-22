export default {
  js: {
    language: "typescript",
    title: "MyComponent.ts",
    example: `autoAnimate(el, {
  // Animation duration in milliseconds (default: 250)
  duration: 250,
  // Easing for motion (default: 'ease-in-out')
  easing: 'ease-in-out',
  // When true, this will enable animations even if the user has indicated
  // they don’t want them via prefers-reduced-motion.
  disrespectUserMotionPreference: false,
  // Turn individual animations off and keep the defaults for the rest,
  // e.g. { remain: false } when a drag-and-drop library already moves items.
  // (default: all true)
  animations: { add: true, remove: true, remain: true },
  // Called when an element's animation finishes ('add' | 'remove' | 'remain').
  // For 'remove' the element is already out of the DOM.
  onAnimationEnd: (el, action) => {}
})`,
  },
}
