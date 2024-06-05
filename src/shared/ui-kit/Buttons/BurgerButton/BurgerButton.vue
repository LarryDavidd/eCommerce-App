<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean
  }
});
const emits = defineEmits(['update:modelValue']);
const handleClick = () => {
  emits('update:modelValue', !props.modelValue);
};
</script>

<template>
  <button
    @click="handleClick"
    :class="{ active: props.modelValue }"
    class="burger-button"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<style scoped lang="scss">
.burger-button {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: all 0.3s;
  }

  &.active span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 5px);
  }

  &.active span:nth-child(2) {
    opacity: 0;
  }

  &.active span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, -7px);
  }
}
</style>
