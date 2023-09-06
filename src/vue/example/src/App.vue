<script setup lang="ts">
import Original from "./component/Original.vue"
import NewCode from "./component/newCode.vue"
import { useAutoAnimate } from "../../index.ts"
import { onMounted, ref } from "vue"
import VueCom from "./component/VueCom.vue"
const defaultList=()=>[1,2,3,4,5,6,7,8,9,10]
const list=ref(defaultList())
const [containerRef,setEnabled]=useAutoAnimate({
  duration:500
})
const randomSort=()=>{
  list.value.sort(()=>Math.random()-0.5)
}
const reset=()=>{
  list.value=defaultList()
  console.log(list.value)
}
</script>

<template>
  <div class="container">
    <Original/>
    <NewCode/>
    <VueCom/>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  gap: 10px;
}
</style>
