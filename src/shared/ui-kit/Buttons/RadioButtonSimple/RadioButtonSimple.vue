<script setup lang="ts">
import { computed, ref } from 'vue';

type PropsType = {
  name: string;
  value?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  value: false,
  disabled: false
});

const emits = defineEmits(['update:modelValue']);

const isSelected = ref<boolean>(props.value);
</script>

<template>
  <div
    class="radio-container"
    @click="emits('update:modelValue')"
  >
    <div :class="[{ active: isSelected, disabled: props.disabled }, 'outer-circle']">
      <div :class="['inner-circle', { active: isSelected, disabled: props.disabled }]"></div>
    </div>
    <label class="label-radio">{{ props.name }}</label>
  </div>
</template>

<style scoped lang="scss">
input {
  color: gray;
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
