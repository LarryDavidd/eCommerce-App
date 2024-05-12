<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  label: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const handleChange = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<template>
  <div class="checkbox-wrapper">
    <input
      type="checkbox"
      id="myCheckbox"
      :checked="props.modelValue"
      @change="handleChange"
    />
    <label for="myCheckbox">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
label {
  line-height: 1.1;
}
input[type='checkbox'] {
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #9c9c9c;
  border-radius: 3px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
}
input[type='checkbox']:checked::before {
  background-color: #9c9c9c;
  border-radius: 2px;
  position: absolute;
  top: 1.5px;
  left: 1.5px;
  content: '';
  display: flex;
  width: 10px;
  height: 10px;
  line-height: 16px;
  text-align: center;
  color: #666;
}
.checkbox-wrapper {
  align-items: center;
  width: 100%;
  display: flex;
  gap: 5px;
}
</style>
