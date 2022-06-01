export default {
  svelte: {
    ext: "svelte",
    language: "html",
    example: `<script>
  import autoAnimate from '@formkit/auto-animate'

  let numbers = [0, 1, 2]
  const add = () => (numbers = [...numbers, numbers.length])
</script>

<ul use:autoAnimate>
  {#each numbers as item}
    <li>{item}</li>
  {/each}
</ul>

<button on:click={add}>Add number</button>`,
  },
}
