<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { validatePassword } from '@shared/validation/validation';
import OpenedEye from '@shared/ui-kit/Icons/OpenedEye.vue';
import ClosedEye from '@shared/ui-kit/Icons/ClosedEye.vue';
import { SimpleInput } from '@shared/ui-kit/Inputs';
import { MainButton } from '@shared/ui-kit/Buttons';

interface InputDescription {
  id: string;
  disabled: boolean;
  title: string;
  iconColor: string;
  isVisible: boolean;
  value: string;
  error: null | string[];
}

const emits = defineEmits(['update:changePassword']);

const handleSubmit = () => {
  if (inputsDescription.value[1].value === inputsDescription.value[2].value) {
    emits('update:changePassword', { currentPassword: inputsDescription.value[0].value, newPassword: inputsDescription.value[1].value });
  } else {
    inputsDescription.value[2].error = ['Passwords do not match. Please try again.'];
  }
};

const inputsDescription = ref<InputDescription[]>([
  {
    id: 'oldPassword',
    disabled: false,
    title: 'Current Password',
    iconColor: '#D6DBE4',
    isVisible: false,
    value: '',
    error: null
  },
  {
    id: 'newPassword',
    disabled: false,
    title: 'New Password',
    iconColor: '#D6DBE4',
    isVisible: false,
    value: '',
    error: null
  },
  {
    id: 'confirmPassword',
    disabled: false,
    title: 'Confirm Password',
    iconColor: '#D6DBE4',
    isVisible: false,
    value: '',
    error: null
  }
]);

watch(
  () => inputsDescription.value[1].value,
  (newVal) => {
    const result = validatePassword(newVal);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    inputsDescription.value[1].error = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

watch(
  () => inputsDescription.value[0].value,
  (newVal) => {
    const result = validatePassword(newVal);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    inputsDescription.value[0].error = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

const isValidButton = computed(() => {
  return inputsDescription.value[1].value !== '' && !inputsDescription.value[1].error;
});
</script>

<template>
  <div class="change-password">
    <h2 class="text-lg">Change Password</h2>
    <div class="window-wrap">
      <div class="form-group">
        <div
          class="input-block"
          v-for="(input, idx) in inputsDescription"
          :key="input.title + idx"
        >
          <span>{{ input.title }}</span>
          <SimpleInput
            :id="input.id"
            placeholder=""
            :disabled="input.disabled"
            v-model="input.value"
            :error="input.error"
            :type="input.isVisible ? 'text' : 'password'"
          >
            <template #before>
              <opened-eye
                class="password-eye"
                v-if="input.isVisible"
                @click="input.isVisible = !input.isVisible"
                :color="input.iconColor"
                @mouseover="input.iconColor = '#b5bac2'"
                @mouseleave="input.iconColor = '#D6DBE4'"
              />
              <closed-eye
                class="password-eye"
                v-else
                :color="input.iconColor"
                @mouseover="input.iconColor = '#b5bac2'"
                @mouseleave="input.iconColor = '#D6DBE4'"
                @click="input.isVisible = !input.isVisible"
              />
            </template>
          </SimpleInput>
        </div>
      </div>
      <MainButton
        :is-disabled="!isValidButton"
        class="submit-button"
        :options="{ buttonStyle: 'light-grey--font-light' }"
        @click="handleSubmit"
        name="Change Password"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-block {
  display: flex;
  flex-direction: column;
  row-gap: 3px;
}

.password-eye {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  transform: translateY(-50%);
}

.change-password {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  transition: all 0.3s ease-in-out;
  cursor: auto;
  &:hover:not(:disabled) {
    cursor: pointer;
    background-color: #c8c6c6;
  }
}
</style>
