<script setup>
import { useAutoAnimate } from "../../../../src/vue/index.ts"
import { ref } from "vue"
const [parent] = useAutoAnimate()
const menuItems = ["Home", "Settings", "Logout"]
const isExpanded = ref(true)
</script>

<template>
  <div class="example react-example">
    <div class="parent" ref="parent">
      <ul v-if="isExpanded" class="drawer">
        <li v-for="item of menuItems" key="item" class="item">{{ item }}</li>
      </ul>
      <div class="content">
        <button
          class="button button--alt"
          type="button"
          @click="isExpanded = !isExpanded"
        >
          Toggle Drawer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  padding: 2rem;
}

.drawer {
  padding-right: 1rem;
  border-right: 1px solid currentColor;
}

.parent {
  height: 180px;
  display: flex;
  position: relative;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 1rem;
  transition: background-color 0.2s;
}

.item:hover {
  background-color: #efefef;
}
</style>
