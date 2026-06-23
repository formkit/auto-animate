<script setup>
// Official multi-color Marko logomark. It uses internal id references (clipPath +
// <use>) to draw the darker two-tone overlays; because this icon renders multiple
// times on a page (every code-window framework switcher plus the jump-link), the
// ids are made unique per instance via useId() so there are no duplicate-id
// collisions. useId() is SSR-stable, which the vite-ssg docs build needs.
import { useId } from "vue"
const uid = useId()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 78 347 191">
    <title>Marko Logo</title>
    <path :id="uid + 'f'" fill="#00CFFB" d="M72.6 141c1.2-2 1.2-4.6 0-6.6L49.8 95.3a3.5 3.5 0 00-6.2 0L.9 170.2a6.6 6.6 0 000 6.6l51.8 88.8a6.6 6.6 0 005.8 3.3h44c3.5 0 5.6-3.7 3.8-6.7l-52-88.8"/>
    <path :id="uid + 'g'" fill="#7CED64" d="M114 173.5h48c2.4 0 4.6-1.3 5.8-3.4L183.9 141c1.2-2 1.1-4.5 0-6.6l-22.8-39a3.5 3.5 0 00-6.2 0l-17 30.3-26-44.4A6.6 6.6 0 00106.2 78H62.3a4.4 4.4 0 00-3.8 6.7l49.8 85.5c1.2 2 3.4 3.3 5.8 3.3"/>
    <path :id="uid + 'h'" fill="#FFD100" d="M221.3 173.4l-51.8 88.8c-1.7 3 .4 6.6 3.8 6.6h44.2c2.3 0 4.5-1.2 5.7-3.3l52-88.7c1.2-2 1.2-4.6 0-6.7l-52-88.8A6.6 6.6 0 00217.5 78H173.3a4.4 4.4 0 00-3.8 6.7l51.8 88.7"/>
    <path :id="uid + 'i'" fill="#FF5467" d="M244.5 78h44.1c2.4 0 4.5 1.3 5.7 3.3l51.8 88.8c1.2 2 1.2 4.6 0 6.7l-51.8 88.7a6.6 6.6 0 01-5.7 3.3H244.5a4.4 4.4 0 01-3.9-6.6l51.8-88.8-51.8-88.7c-1.7-3 .4-6.7 3.9-6.7"/>
    <use fill="#0073D8" :clip-path="'url(#' + uid + 'a)'" :href="'#' + uid + 'b'"/>
    <use fill="#00B068" :clip-path="'url(#' + uid + 'c)'" :href="'#' + uid + 'b'"/>
    <use fill="#FC5C00" :clip-path="'url(#' + uid + 'd)'" :href="'#' + uid + 'b'"/>
    <use fill="#CC0067" :clip-path="'url(#' + uid + 'e)'" :href="'#' + uid + 'b'"/>
    <defs>
      <clipPath :id="uid + 'a'">
        <use :href="'#' + uid + 'f'"/>
      </clipPath>
      <clipPath :id="uid + 'c'">
        <use :href="'#' + uid + 'g'"/>
      </clipPath>
      <clipPath :id="uid + 'd'">
        <use :href="'#' + uid + 'h'"/>
      </clipPath>
      <clipPath :id="uid + 'e'">
        <use :href="'#' + uid + 'i'"/>
      </clipPath>
      <path :id="uid + 'b'" d="M0 173.4H111.1376L137.9 125.7V78H157l51 95.4H347V425H0"/>
    </defs>
  </svg>
</template>