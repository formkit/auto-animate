<template>
<div class="container column">
  <slot/>
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
}
</style>
