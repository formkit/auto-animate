<script setup lang="ts">
import { useAutoAnimate } from "../../../index.ts"
import { onMounted, ref } from "vue"
const defaultList=()=>[1,2,3,4,5,6,7,8,9,10]
const list=ref(defaultList())
const containerRef=ref<HTMLElement|null>(null)
const [_containerRef,setEnabled]=useAutoAnimate({
  el:containerRef,
  duration:1000,
})
onMounted(()=>{
  console.log(containerRef === _containerRef)
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
  <div class="container column gap">
    <h1>newCode</h1>
    <div>
      <button @click="randomSort">sort</button>
      <button @click="reset">rest</button>
      <button @click="()=>setEnabled(true)">turn on</button>
      <button @click="()=>setEnabled(false)">turn off</button>
    </div>
    <div ref="containerRef" >
      <div v-for="item in list" class="box" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
}
.gap{
  gap: 10px;
}
.column{
  flex-direction: column;
}
.box{
  width: 30px;
  height: 30px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
