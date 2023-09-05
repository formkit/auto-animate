
<script setup lang="ts">
import CompOne from "./test-components/CompOne.vue";
import CompTwo from "./test-components/CompTwo.vue";
import { KeepAlive, ref } from 'vue'
import { vAutoAnimate } from "../../../src";

const toggle = ref(true)
</script>

<template>
  <div id="test-app">
    <div v-auto-animate>
      <KeepAlive>
        <CompOne key="a" v-if="toggle" />
      </KeepAlive>

      <KeepAlive>
        <CompTwo key="b" v-if="!toggle" />
      </KeepAlive>
    </div>

    <button @click="toggle = !toggle">Toggle</button>
  </div>
</template>


<style>
#test-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.comp {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #C8E6C9;
  margin: 0 auto 30px;
  font-weight: 700;
}

button {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>
