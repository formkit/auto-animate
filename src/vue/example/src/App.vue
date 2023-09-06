<script setup lang="ts">
import Original from "./component/Original.vue"
import NewCode from "./component/newCode.vue"
</script>

<template>
  <div class="container">
    <Original/>
    <NewCode/>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  gap: 10px;
}
</style>
