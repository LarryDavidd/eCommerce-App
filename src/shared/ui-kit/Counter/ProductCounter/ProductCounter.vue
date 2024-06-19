<template>
  <div class="counter">
    <button
      @click="decrement"
      :disabled="isInProcess"
    >
      -
    </button>
    <span class="count">{{ props.count }}</span>
    <button
      @click="increment"
      :disabled="isInProcess"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  count: number;
  isInProcess: boolean;
};

const props = defineProps<PropsType>();

const emit = defineEmits(['update:modelValue']);

const increment = () => {
  emit('update:modelValue', props.count + 1);
};

const decrement = () => {
  emit('update:modelValue', props.count - 1);
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
