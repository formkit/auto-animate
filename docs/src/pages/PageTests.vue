<script setup lang="ts">
import { ref } from "vue"
import { vAutoAnimate } from "../../../src/index"
const show = ref(false)
const records = ref([
  { id: 1, name: "Billy", career: "Fireman" },
  { id: 2, name: "Jane", career: "Pilot" },
  { id: 3, name: "Sally", career: "Engineer" },
  { id: 4, name: "Todd", career: "Chef" },
])

const items = ref(new Array(100).fill(0).map((_, i) => ({ key: Math.random(), value: i, height: `${Math.floor(Math.random() * 200)}px` })))

function remove (item: { key: number; value: number }) {
  items.value.splice(items.value.indexOf(item), 1)
}
</script>

<template>
  <table border="1" style="table-layout: fixed">
    <thead>``
      <tr>
        <th>Name</th>
        <th>Career</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-auto-animate="{ duration: 5000 }">
      <tr
        v-for="(record, index) in records"
        :data-index="index"
        :key="record.id"
      >
        <td>{{ record.name }}</td>
        <td>{{ record.career }}</td>
        <td>
          <a href="#remove" @click.prevent="records.splice(index, 1)">Remove</a>
        </td>
      </tr>
    </tbody>
  </table>
  <textarea class=""></textarea>
  <div style="display: flex">
    <textarea />
    <div class="dropdown" @click="show = !show" v-auto-animate>
      <strong>This is a dropdown.</strong>
      <div class="dropdown-content" v-if="show">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  </div>
  <ul v-auto-animate="{}">
    <li v-for="item in items" :key="item.key" class="pusher" :style="{ minHeight: item.height }">Item {{ item.value }} <button @click.prevent="remove(item)">Remove item</button></li>
  </ul>
  <div class="box-background"></div>
</template>
<style>
body {
  /* overflow: hidden; */
}
</style>
<style scoped>
.dropdown {
  width: 500px;
  background-color: white;
  border: 2px solid var(--gray-m);
  border-radius: 0.75em;
  padding: 1em;
}
.dropdown-content {
  margin-top: 1em;
}

.pusher {
  border: 2px solid var(--gray-m);
}
.box-background {
  width: 500px;
  height: 100px;
  background-image: linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px);
  background-size: 20px 20px;
}

/* [data-index="1"] {
  position: absolute;
  width: 100%;
} */
</style>
