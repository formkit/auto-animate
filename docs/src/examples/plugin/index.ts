export const bouncy = {
  js: {
    ext: "js",
    language: "javascript",
    example: `import autoAnimate, { getTransitionSizes } from '@formkit/auto-animate'

autoAnimate(parentElement, (el, action, oldCoords, newCoords) => {
  let keyframes
  // supply a different set of keyframes for each action
  if (action === 'add') {
    keyframes = [
      { transform: 'scale(0)', opacity: 0 },
      { transform: 'scale(1.15)', opacity: 1, offset: 0.75 },
      { transform: 'scale(1)', opacity: 1 }
    ]
  }
  // keyframes can have as many "steps" as you prefer
  // and you can use the 'offset' key to tune the timing
  if (action === 'remove') {
    keyframes = [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(1.15)', opacity: 1, offset: 0.33 },
      { transform: 'scale(0.75)', opacity: 0.1, offset: 0.5 },
      { transform: 'scale(0.5)', opacity: 0 }
    ]
  }
  if (action === 'remain') {
    // for items that remain, calculate the delta
    // from their old position to their new position
    const deltaX = oldCoords.left - newCoords.left
    const deltaY = oldCoords.top - newCoords.top
    // use the getTransitionSizes() helper function to
    // get the old and new widths of the elements
    const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords)
    // set up our steps with our positioning keyframes
    const start = { transform: \`translate(\${deltaX}px, \${deltaY}px)\` }
    const mid = { transform: \`translate(\${deltaX * -0.15}px, \${deltaY * -0.15}px)\`, offset: 0.75 }
    const end = { transform: \`translate(0, 0)\` }
    // if the dimensions changed, animate them too.
    if (widthFrom !== widthTo) {
      start.width = \`\${widthFrom}px\`
      mid.width = \`\${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px\`
      end.width = \`\${widthTo}px\`
    }
    if (heightFrom !== heightTo) {
      start.height = \`\${heightFrom}px\`
      mid.height = \`\${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px\`
      end.height = \`\${heightTo}px\`
    }
    keyframes = [start, mid, end]
  }
  // return our KeyframeEffect() and pass
  // it the chosen keyframes.
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: 'ease-out' })
}))
`,
  },
}
export const usingPreset = {
  vue:{
    ext: "vue",
    language: "typescript",
    example: `
      <script setup lang="ts" name="UsingPreset">
import { ref } from "vue"

import { vAutoAnimate } from "../../../../src"
import { autoAnimationPlugins } from "../../../../src/plugins/preset"
import IconRemove from "../../components/IconRemove.vue"

const items = ref(["React", "Solid", "Vue", "Svelte", "Angular"])
const getRandomChar = () =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")[
    Math.floor(Math.random() * 62)
    ]
const getRandomWord = () =>
  Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => getRandomChar()).join("")

function insertAtSecond () {
  items.value = [...items.value.slice(0, 1), getRandomWord(), ...items.value.slice(1)]
}

function removeLastOne () {
  items.value = [...items.value.slice(0, items.value.length - 1)]
}

function sortAsc () {
  items.value.sort()
}

function sortDesc () {
  items.value.sort().reverse()
}
</script>

<template>
  <div class="w-full">
    <div class="p-2 mb-2">
      <button class="button button--alt" @click="insertAtSecond">Insert at second</button>
      <button class="button button--alt" @click="removeLastOne">Remove Last one</button>
      <button class="button button--alt" @click="sortAsc">Sort A-Z ↑</button>
      <button class="button button--alt" @click="sortDesc">Sort Z-A ↓</button>
    </div>
    <div class="h-700px overflow-y-auto flex flex-wrap">
      <div v-for="(plugin, pluginName) in autoAnimationPlugins" :key="pluginName" class="w-400px">
        <div class="text-blue-500 p-2 font-bold w-full">using {{ pluginName }} plugin:</div>
        <ul v-auto-animate="plugin">
          <li
            v-for="item in items"
            class="bg-purple-5 text-white list-none mb-2 p-3 rounded-md flex justify-between items-center"
            :key="item"
          >
            <span>{{ item }}</span>
            <button aria-label="Remove Fruit" @click="items = items.filter(f=>f!==item)" class="border-none bg-transparent ">
              <icon-remove class="fill-red-5 w-5"/>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

    `
  }
}

