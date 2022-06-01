export default {
  svelte: {
    ext: "svelte",
    language: "html",
    example: `<script>
  import autoAnimate from '@formkit/auto-animate';
  let tags = ['Rock', 'Punk'];
  function addItem(e) {
    if (e.which === 13) {
      tags.push(e.target.value);
      tags = tags;
      e.target.value = '';
    }
  }
  function remove(target) {
    tags = tags.filter((tag) => target !== tag);
  }
</script>

<template>
  <label for="add-tag-input" class="tag-input">
    <ul use:autoAnimate> <!-- 👀 thats it folks! -->
      {#each tags as tag}
        <li class="tag">
          <span>{tag}</span>
          <span on:click={() => remove(tag)}>x</span>
        </li>
      {/each}
      <li>
        <input
          id="add-tag-input"
          type="text"
          placeholder="Add a tag..."
          on:keydown={addItem}
        />
      </li>
    </ul>
  </label>
</template>`,
  },
}
