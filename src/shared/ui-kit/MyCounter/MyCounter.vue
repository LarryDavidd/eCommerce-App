<template>
  <div class="counter">
    <button @click="decrement">-</button>
    <span class="count">{{ count }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
});

const count = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

const increment = () => {
  count.value++;
  emit('update:modelValue', count.value);
};

const decrement = () => {
  if (count.value <= 1) {
    return;
  }
  count.value--;
  emit('update:modelValue', count.value);
};
</script>

<style scoped lang="scss">
.counter {
  font-weight: 500;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #c6c6c6;
  gap: 3px;
}

button {
  display: flex;
  align-items: center;
  padding: 0 8px;
  max-height: 27px;
  font-size: 20px;
  color: #838383;
  transition: color 0.2s ease;
  border: none;
  cursor: pointer;
}

button:hover {
  color: #232323;
}

.count {
  width: 30px;
  text-align: center;
  display: inline-block;
}
</style>
