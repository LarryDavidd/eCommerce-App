<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value?: string | null;
  modelValue?: string | null;
  disabled?: boolean;
  name?: string;
}>();

const emits = defineEmits(['update:modelValue']);
const toggleRadio = () => {
  if (selected.value) {
    emits('update:modelValue', null);
  } else {
    emits('update:modelValue', val);
  }
};
const selected = computed(() => {
  return props.value === props.modelValue;
});
const val = props.value;
</script>

<template>
  <div class="radio-container">
    <div
      :class="[{ active: selected, disabled: props.disabled }, 'outer-circle']"
      @click="toggleRadio"
    >
      <div :class="['inner-circle', { active: selected, disabled: props.disabled }]"></div>
    </div>
    <span class="label-radio">{{ props.value }}</span>
    <input
      type="radio"
      :value="val"
      :name="props.name"
      :checked="selected"
    />
  </div>
</template>

<style scoped lang="scss">
input {
  display: none;
}
.radio-container {
  align-items: center;
  justify-content: start;
  display: flex;
  gap: 3px;
}
.label-radio {
  color: #000000b8;
}
.inner-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 7px;
  height: 7px;
  background: #000000b8;
  border-radius: 100%;
  opacity: 0;
  &.active {
    opacity: 1;
  }
}
.outer-circle {
  display: inline;
  cursor: pointer;
  position: relative;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  border: 1px solid #000000b8;
  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
