export default {
  marko: {
    language: "marko",
    ext: "marko",
    example: `import AutoAnimate from "@formkit/auto-animate/marko"

<let/lineup = ["🎸 Nova", "🎤 Rex", "🥁 Juno", "🎹 Iris"]>

// Click an artist to bump them to the top of the bill.
<ul/stage>
  <for|artist| of=lineup by=(a => a)>
    <li onClick() { lineup = [artist, ...lineup.filter(a => a !== artist)] }>
      \${artist}
    </li>
  </for>
</ul>
<AutoAnimate parent=stage/>`,
  },
}
