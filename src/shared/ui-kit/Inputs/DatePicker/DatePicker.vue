<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import ErrorIcon from '@shared/ui-kit/Icons/ErrorIcon.vue';
import { ref } from 'vue';
import { useRegistrationStore } from '@app/stores/registration';

const store = useRegistrationStore();
type PropsType = {
  name?: string;
  placeholder: string;
  error: string | null;
  disabled?: boolean;
  modelValue: Date | null;
};
withDefaults(defineProps<PropsType>(), {
  name: 'Date Picker',
  disabled: false,
  error: null,
  placeholder: ''
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void;
}>();
const date = ref(store.birthDate);

function handleSelect(data: Date) {
  emit('update:modelValue', data);
}
</script>

<template>
  <VueDatePicker
    v-model="date"
    :enable-time-picker="false"
    @update:model-value="handleSelect"
    placeholder="Birthday date"
    :class="['date-picker', error ? 'error-input' : '']"
  ></VueDatePicker>

  <transition name="fade">
    <div
      v-if="error"
      class="error-message"
    >
      <ErrorIcon class="shrink-0" />
      <span class="error text-xs text-red-500">
        {{ error }}
      </span>
    </div>
  </transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.date-picker.error-input {
  .dp__input {
    border: 2px solid #fd304a;
  }
}

.error-message {
  width: 100%;
  min-height: 32px;
  @apply flex items-start gap-2;
}

.date-picker {
  .dp__input {
    border-radius: 0;
    border: 1px solid #dedede;
    color: #525252;
    font-family: 'Montserrat';
    font-size: 18px;
  }

  .dp__input::placeholder {
    font-size: 18px;
    color: #ababab;
  }
}
</style>
