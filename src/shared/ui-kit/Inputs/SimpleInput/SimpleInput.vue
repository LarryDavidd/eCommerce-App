<script setup lang="ts">
import ErrorIcon from '@shared/ui-kit/Icons/ErrorIcon.vue';
import { ref } from 'vue';

type PropsType = {
  name?: string;
  placeholder: string;
  type?: 'text' | 'password' | 'phone' | 'email' | 'number';
  error: string[] | null;
  required?: boolean;
  disabled?: boolean;
  modelValue: string | number;
};

withDefaults(defineProps<PropsType>(), {
  name: 'Simple Input',
  disabled: false,
  error: null,
  required: false,
  placeholder: '',
  type: 'text'
});
const emit = defineEmits(['update:modelValue']);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
}
</script>

<template>
  <div class="simple-input-wrap flex flex-col gap-1">
    <slot name="after" />
    <input
      autocomplete="off"
      :class="['simple-input', error ? 'error-input' : '']"
      :required="required"
      :type="type"
      :id="placeholder"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      :disabled="disabled"
    />
    <slot name="before" />
    <transition name="fade">
      <div
        v-if="error"
        class="error-message"
      >
        <ErrorIcon class="shrink-0" />
        <span
          v-for="(err, index) in error"
          :key="index"
          class="error text-xs text-red-500"
        >
          {{ err }}
        </span>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.error-message {
  min-height: 32px;
  @apply flex items-start gap-2;
}

.simple-input-wrap {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.simple-input {
  max-height: 40px;
  line-height: 1.2;
  outline: none;
  font-size: 18px;
  color: #525252;
  padding: 9px 10px;
  border: 1px solid #dedede;
  &.error-input {
    border: 2px solid #fd304a;
  }
  &::placeholder {
    font-size: 18px;
    color: #ababab;
  }
  @apply w-full bg-white;
}
</style>
