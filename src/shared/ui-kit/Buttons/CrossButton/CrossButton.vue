<script setup lang="ts"></script>

<template>
  <div class="container">
    <span class="line first"></span>
    <span class="line second"></span>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 30px;
  width: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    .line {
      background-color: #9a0e07;
    }
  }
}

.line {
  transition: all 0.3s ease;
  border-radius: 2px;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #525252;
}

.first {
  top: 50%;
  transform: rotate(-45deg) translateY(-50%);
}

.second {
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
}
</style>
