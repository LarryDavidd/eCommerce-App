<script setup lang="ts">
import ErrorIcon from '@shared/ui-kit/Icons/ErrorIcon.vue';

type PropsType = {
  name: string;
  placeholder: string;
  type?: 'text' | 'password' | 'phone' | 'email' | 'number';
  error: string | null | undefined;
  required: boolean;
  disabled?: boolean;
  maxWidth?: string;
  modelValue: string | number;
};
withDefaults(defineProps<PropsType>(), {
  name: 'Simple Input',
  disabled: false,
  error: '',
  required: true,
  placeholder: '',
  maxWidth: '300px',
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
  <div
    :style="{ maxWidth: maxWidth }"
    style="width: 100%"
    class="m-2"
  >
    <slot name="after" />
    <input
      :class="['simple-input w-full bg-white', error ? 'error-input' : '']"
      :required="required"
      :type="type"
      :id="name"
      style="border: 1px solid #dedede"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
    <slot name="before" />
    <transition name="fade">
      <div
        v-if="error"
        class="fl flex items-center gap-2"
      >
        <ErrorIcon />
        <span class="error text-red-500">{{ error }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.error-input {
  border: 2px solid #fd304a;
}
.simple-input {
  max-height: 40px;
  line-height: 1.2;
  outline: none;
  font-size: 18px;
  color: #525252;
  padding: 9px 10px;

  &::placeholder {
    font-size: 18px;
    color: #ababab;
  }
}
</style>
