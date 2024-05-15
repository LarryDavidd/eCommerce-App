<script setup lang="ts">
import { ref, toRefs, watch, computed } from 'vue';
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import FormWrapper from '@shared/ui-kit/FormWrapper/FormWrapper.vue';
import DatePicker from '@shared/ui-kit/Inputs/DatePicker/DatePicker.vue';
import { validateName, validateBirthDate } from '@shared/utils/validation';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';

export interface StepData {
  name: string;
  surname: string;
  birthDate: Date | null;
}
const props = defineProps({
  data: { type: Object as () => StepData, required: true },
  cb: { type: Function, required: true }
});
const { data } = toRefs(props);

const errorsName = ref<null | string[]>(null);
const errorsSurname = ref<null | string[]>(null);
const errorsBirthDate = ref<null | string>(null);

watch(
  () => data.value.name,
  (newName) => {
    const result = validateName(newName);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    errorsName.value = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

watch(
  () => data.value.surname,
  (newSurname) => {
    const result = validateName(newSurname);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    errorsSurname.value = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

watch(
  () => data.value.birthDate,
  (newBirthDate) => {
    if (!newBirthDate) errorsBirthDate.value = 'This field is required';
    else {
      const isValid = validateBirthDate(new Date(newBirthDate));
      errorsBirthDate.value = isValid ? null : 'The user must be over 14 years old';
    }
  },
  { deep: true }
);

const isValidInputData = computed(() => {
  return !errorsName.value && !errorsSurname.value && !errorsBirthDate.value && data.value.name && data.value.surname && data.value.birthDate;
});

const nextStep = () => {
  props.cb();
};
</script>

<template>
  <FormWrapper :on-submit="nextStep">
    <template #content>
      <div class="title-block">
        <span class="title">Registration</span>
        <span>Step 1</span>
      </div>
      <SimpleInput
        v-model="data.name"
        placeholder="Name"
        :error="errorsName"
      />
      <SimpleInput
        v-model="data.surname"
        placeholder="Surname"
        :error="errorsSurname"
      />
      <DatePicker
        v-model="data.birthDate"
        placeholder="BirthDate"
        :error="errorsBirthDate"
      />
      <MainButton
        id="next-but"
        class="button"
        type="submit"
        :disabled="!isValidInputData"
        :options="{ buttonStyle: 'dark-grey' }"
        name="Next"
      >
      </MainButton>
    </template>
  </FormWrapper>
</template>

<style scoped lang="scss">
.button:not(:disabled):hover {
  cursor: pointer;
}

.button {
  width: 100%;
  border-radius: 2px;
  margin: 0;
  height: 40px;
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

.auth-wrapper {
  background-color: #e8e7e7;
  padding: 20px 50px;
}

button:disabled {
  opacity: 0.5;
}
</style>
