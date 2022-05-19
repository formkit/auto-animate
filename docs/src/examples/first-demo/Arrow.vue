<script setup>
import { defineProps } from 'vue'

defineProps({
  direction: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :class="direction"
  >
    <path d="M13.64,6.59l7.54,7.54c.91,.91,.91,2.38,0,3.29-.44,.44-1.03,.68-1.64,.68H4.46c-1.28,0-2.32-1.04-2.32-2.32,0-.62,.24-1.21,.68-1.64l7.54-7.54c.91-.91,2.38-.91,3.29,0h0Z" />
  </svg>
</template>
