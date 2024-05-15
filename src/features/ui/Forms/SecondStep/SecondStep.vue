<script setup lang="ts">
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import { computed, ref, toRefs, watch } from 'vue';
import OpenedEye from '@shared/ui-kit/Icons/OpenedEye.vue';
import ClosedEye from '@shared/ui-kit/Icons/ClosedEye.vue';
import { validatePassword, validateEmail } from '@shared/utils/validation';
import FormWrapper from '@shared/ui-kit/FormWrapper/FormWrapper.vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';

export interface StepData {
  email: string;
  password: string;
}
const props = defineProps({
  data: { type: Object as () => StepData, required: true },
  cb: { type: Function, required: true }
});
const { data } = toRefs(props);

const errorsEmail = ref<null | string[]>(null);
const errorsPassword = ref<null | string[]>(null);
const isVisible = ref(false);
const iconColor = ref('#D6DBE4');

watch(
  () => data.value.email,
  (newEmail) => {
    const result = validateEmail(newEmail);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    errorsEmail.value = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

watch(
  () => data.value.password,
  (newPassword) => {
    const result = validatePassword(newPassword);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    errorsPassword.value = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

const isValidInputData = computed(() => {
  return !errorsEmail.value && !errorsPassword.value && data.value.email && data.value.password;
});

const nextStep = () => {
  props.cb();
};
const prevStep = () => {
  props.cb(false);
};
</script>
<template>
  <FormWrapper>
    <template #content>
      <div class="title-block">
        <span class="title">Registration</span>
        <span>Step 2</span>
      </div>
      <SimpleInput
        v-model="data.email"
        placeholder="Email"
        :error="errorsEmail"
      />
      <SimpleInput
        v-model="data.password"
        placeholder="Password"
        :error="errorsPassword"
        :type="isVisible ? 'text' : 'password'"
      >
        <template #before>
          <opened-eye
            class="password-eye"
            v-if="isVisible"
            @click="isVisible = !isVisible"
            :color="iconColor"
            @mouseover="iconColor = '#b5bac2'"
            @mouseleave="iconColor = '#D6DBE4'"
          />
          <closed-eye
            class="password-eye"
            v-else
            :color="iconColor"
            @mouseover="iconColor = '#b5bac2'"
            @mouseleave="iconColor = '#D6DBE4'"
            @click="isVisible = !isVisible"
          />
        </template>
      </SimpleInput>
      <div class="button-block">
        <MainButton
          class="button"
          type="submit"
          :options="{ buttonStyle: 'dark-grey' }"
          name="Prev"
          @click="prevStep"
        >
        </MainButton>
        <MainButton
          class="button"
          type="submit"
          :disabled="!isValidInputData"
          :options="{ buttonStyle: 'dark-grey' }"
          name="Next"
          @click="nextStep"
        >
        </MainButton>
      </div>
    </template>
  </FormWrapper>
</template>

<style scoped lang="scss">
.button:not(:disabled):hover {
  cursor: pointer;
}
.button {
  border-radius: 2px;
  margin: 0;
  height: 40px;
}
.next-button {
  max-width: 300px;
  height: 40px;
  font-size: 13px;
}
.button-block {
  width: 100%;
  gap: 30px;
  display: flex;
  align-items: center;
}
.title-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  @apply text-xl;
}
.link {
  @apply text-gray-600
  underline
  duration-200
  hover:text-gray-900;
}

.password-eye {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  transform: translateY(-50%);
}

button:disabled {
  opacity: 0.5;
}
</style>
