<script setup lang="ts">
import { onMounted, ref } from "vue"
import { vAutoAnimate } from "../../../src"

const sequence = ref(0)

const duration = 50

onMounted(() => {
  const interval = setInterval(() => {
    sequence.value++
    if (sequence.value > 11) {
      clearInterval(interval)
    }
  }, duration)
})
</script>

<template>
  <svg
    id="logo"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 2493.5 306.9"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        x1="0"
        y1="145.3"
        x2="300"
        y2="145.3"
        gradientTransform="translate(0 302.2) scale(1 -1)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#4711de" />
        <stop offset=".29" stop-color="#4811da" />
        <stop offset=".6" stop-color="#4a11cd" />
        <stop offset=".92" stop-color="#4e11b8" />
        <stop offset="1" stop-color="#4f11b1" />
      </linearGradient>
    </defs>
    <g id="letters" class="cls-3">
      <path
        v-if="sequence > 0"
        class="cls-2"
        d="M426.6,13.1h45.3l89.9,242.9h-39.4l-19-52.7h-108.9l-19,52.7h-38.4L426.6,13.1Zm65,156.5l-41.5-114.5h-2.4l-41.5,114.5h85.4Z"
      />
      <path
        v-if="sequence > 1"
        class="cls-2"
        d="M583.6,191.2V74.6h36.3v110c0,25.7,17.6,42.3,40.4,42.3,25.2,0,43.9-19.4,43.9-45.8V74.6h36.3v181.5h-35.3v-24.3h-2.4c-7.3,14.9-25.9,28.8-52.9,28.8-41.1,0-66.3-30.2-66.3-69.4Z"
      />
      <path
        v-if="sequence > 2"
        class="cls-2"
        d="M803.4,198.4V104.4h-32.5v-29.5h23.9c6.2,0,10.7-4.5,10.7-11.8V23.2h34.2v51.4h52.5v29.8h-52.5v93c0,17.3,7.3,27.8,26.3,27.8h24.5v30.9h-30.1c-35.5-.1-57-19.8-57-57.7Z"
      />
      <path
        v-if="sequence > 3"
        class="cls-2"
        d="M914.8,165.5c0-54.5,40.1-95.4,95.8-95.4s95.1,41.3,95.1,95.4-40.1,95.1-95.4,95.1-95.5-40.6-95.5-95.1Zm153.8,0c0-36.1-24.2-62.1-58.4-62.1s-58.4,26.4-58.4,62.1,24.5,62.1,58.4,62.1,58.4-26.4,58.4-62.1Z"
      />
      <path
        v-if="sequence > 4"
        class="cls-2"
        d="M1215,13.1h45.3l89.9,242.9h-39.4l-19-52.7h-108.9l-19,52.7h-38.4L1215,13.1Zm65,156.5l-41.4-114.5h-2.4l-41.5,114.5h85.3Z"
      />
      <path
        v-if="sequence > 5"
        class="cls-2"
        d="M1376.5,74.6h35.3v24.3h2.4c7.3-14.9,25.9-28.8,52.9-28.8,41.1,0,66.4,30.2,66.4,69.4v116.6h-36.3v-109.7c0-25.3-17.6-42.3-40.4-42.3-25.2,0-43.9,19.8-43.9,46.2v105.8h-36.3l-.1-181.5h0Z"
      />
      <path
        v-if="sequence > 6"
        class="cls-2"
        d="M1572.2,22.9c0-13.2,10-22.9,23.9-22.9s24.2,9.7,24.2,22.9c0,13.9-10,23.2-24.2,23.2s-23.9-9.4-23.9-23.2Zm5.5,51.7h36.3v181.5h-36.3V74.6Z"
      />
      <path
        v-if="sequence > 7"
        class="cls-2"
        d="M1658.2,74.6h35.3v23.9h2.4c8-15.3,24.9-28.5,50.8-28.5s44.9,12.1,55.3,30.5h2.4c12.1-21.5,31.1-30.5,55.7-30.5,39.8,0,66,27.8,66,67v119h-36.3v-106.5c0-29.5-14.2-45.5-38-45.5s-41.1,17-41.1,46.2v105.8h-36.3v-110.6c0-25.3-16.2-41.3-39.1-41.3s-40.8,18.4-40.8,45.1v106.9h-36.3V74.6Z"
      />
      <path
        v-if="sequence > 8"
        class="cls-2"
        d="M1957.6,165.8c0-56.2,35.6-95.8,86.1-95.8,34.6,0,53.2,21.5,59.1,30.9h2.4v-26.4h36.3V256h-35.5v-25.7h-2.1c-4.8,6.9-22.5,30.2-58.4,30.2-51.9,.1-87.9-38.5-87.9-94.7Zm148.7-.3c0-39.2-24.2-62.1-56-62.1s-55.7,25.7-55.7,62.1,22.8,62.1,56,62.1,55.7-27.8,55.7-62.1Z"
      />
      <path
        v-if="sequence > 9"
        class="cls-2"
        d="M2203.4,198.4V104.4h-32.5v-29.5h23.9c6.2,0,10.7-4.5,10.7-11.8V23.2h34.2v51.4h52.5v29.8h-52.5v93c0,17.3,7.3,27.8,26.3,27.8h24.5v30.9h-30.1c-35.5-.1-57-19.8-57-57.7Z"
      />
      <path
        v-if="sequence > 10"
        class="cls-2"
        d="M2314.8,165.8c0-57.6,38.7-95.8,90.2-95.8,56.4,0,88.5,41.6,88.5,93.3v13.5h-142.4c1.4,31.6,22.5,53.1,55.7,53.1,22.8,0,42.5-11.1,49.8-28.8h35.3c-9.3,35-41.5,59.3-86.1,59.3-54.4,.2-91-40.1-91-94.6Zm142.7-17c-2.4-30.5-24.5-48.2-52.5-48.2s-50.5,19.8-53.2,48.2h105.7Z"
      />
    </g>
    <path
      id="mark"
      class="cls-1"
      d="M300,256.9v50H150v-50h150ZM50,206.9v50H0v-50H50Zm50-50v50H50v-50h50Zm50-50v50h-50v-50h50Zm-50-50v50H50V56.9h50ZM50,6.9V56.9H0V6.9H50Z"
    />
  </svg>
</template>

<style scoped>
.cls-1 {
  fill: url(#linear-gradient);
  fill-rule: evenodd;
}

.cls-2 {
  fill: #111;
}
[data-dark-mode="true"] .cls-2 {
  fill: #eee;
}

.cls-3 {
  isolation: isolate;
}
</style>
