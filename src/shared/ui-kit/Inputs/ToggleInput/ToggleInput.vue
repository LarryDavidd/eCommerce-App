<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  disabled: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  }
});
const emits = defineEmits(['update:modelValue']);
const toggle = () => {
  emits('update:modelValue', !props.modelValue);
};
</script>

<template>
  <div class="toggle-wrapper">
    <div
      @click="toggle"
      :class="{ 'cursor-pointer': !disabled, 'bg-green-400': modelValue }"
      class="toggle-wrap flex h-8 w-14 items-center rounded-full bg-gray-300 p-1 transition-all duration-300"
    >
      <div
        :class="{ 'translate-x-6': modelValue }"
        class="h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300"
      ></div>
    </div>
    <span>
      {{ props.text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.toggle-wrapper {
  gap: 5px;
  align-items: center;
  display: flex;
}
</style>
