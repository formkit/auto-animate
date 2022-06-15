<script setup>
import { vAutoAnimate } from "../../../../src/index"
import { ref } from "vue"

const storyA = {title: 'The Ant and The Grasshopper', showStory: false, story: "The ant and the grasshopper were good friends. In the summer, the ant works hard to fill his storage with food. While the grasshopper was enjoying the fine weather and playing all day. When winter came, the ant was lying cozily in his home surrounded by the food he stored during the summer. While the grasshopper was in his home, hungry and freezing. He asked the ant for food and the ant gave him some. But it wasn’t enough to last the entire winter. When he tried to ask the ant again, the latter replied: \"I'm sorry my friend but my food is just enough for my family to last until the end of winter. If I give you more, we too will starve. We had the entire summer to prepare for the winter but you chose to play instead.\""}
const storyB = {title: 'The Boy Who Cried Wolf', showStory: false, story: "There was once a shepherd boy who liked to play tricks. One day, while he was watching over the herd, the boy decided to play a trick and cried “wolf! wolf!”. The people who heard rushed over to help him. But they were disappointed when they saw that there was no wolf and the boy was laughing at them. The next day, he did it again and people rushed to his aid only to be disappointed once again. On the third day, the boy saw a wolf devouring one of his sheep and cried for help. But the people who heard him thought this is just another of the boy’s pranks so no one came to help him. That day, the boy lost some of his sheep to the wolf."}
const stories = ref([storyA, storyB]);

</script>

<template>
  <div class="example angular-example grid">
    <div v-for="(story, key) in stories" :key="key">
      <div class="story-card" v-auto-animate>
        <h2>{{ story.title }}</h2>
        <div v-if="story.showStory">{{ story.story }}</div>
        <button class="button toggle-story-btn" @click="story.showStory = !story.showStory">Toggle story</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 10px; font-size: 0.875em; }
.story-card { background-color: var(--purple-md); padding: 0.75em; border-radius: 0.5em; box-shadow: 0 0 0.5em rgb(0 0 0 / 10%); }
.story-card h2 { margin: 0; padding: 0; font-size: 1.5em}
.toggle-story-btn { margin: 1em 0 0; }
</style>
