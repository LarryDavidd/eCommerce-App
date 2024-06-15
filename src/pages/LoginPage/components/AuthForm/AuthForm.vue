<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';
import { validatePassword, validateEmail } from '@shared/validation/validation';
import FormWrapper from '@shared/ui-kit/FormWrapper/FormWrapper.vue';
import OpenedEye from '@shared/ui-kit/Icons/OpenedEye.vue';
import ClosedEye from '@shared/ui-kit/Icons/ClosedEye.vue';
import { SimpleInput } from '@shared/ui-kit/Inputs';
import { MainButton } from '@shared/ui-kit/Buttons';

const costumerStore = useCostumerStore();

const creds = ref({
  email: '',
  password: ''
});
const emits = defineEmits(['submitForm']);
const errorsEmail = ref<null | string[]>(null);
const errorsPassword = ref<null | string[]>(null);

function checkEmail(email: string) {
  const result = validateEmail(email);
  const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
  errorsEmail.value = errorList.length > 0 ? errorList : null;
  emailIsValid.value = errorList.length <= 0;
}

function checkPassword(password: string) {
  const result = validatePassword(password);
  const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
  errorsPassword.value = errorList.length > 0 ? errorList : null;
  passwordIsValid.value = errorList.length <= 0;
}

const isVisible = ref(false);
const iconColor = ref('#D6DBE4');

const emailIsValid = ref(false);
const passwordIsValid = ref(false);

const isValidInputData = computed(() => emailIsValid.value && passwordIsValid.value);

const login = () => {
  emits('submitForm', { email: creds.value.email, password: creds.value.password });
};
</script>
<template>
  <FormWrapper :on-submit="login">
    <template #content>
      <h1 class="title">Sign in to your account</h1>
      <SimpleInput
        v-model="creds.email"
        placeholder="Email"
        :error="errorsEmail"
        @update:modelValue="checkEmail"
      />
      <SimpleInput
        v-model="creds.password"
        placeholder="Password"
        :error="errorsPassword"
        @update:modelValue="checkPassword"
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
      <MainButton
        id="sign-in"
        class="sign-in"
        type="submit"
        :disabled="!isValidInputData"
        :isLoading="costumerStore.isLoading"
        :options="{ buttonStyle: 'dark-grey' }"
        name="Sign in"
      >
      </MainButton>
      <p>
        Don't you have an account?
        <router-link to="/registration">
          <span class="link">Register</span>
        </router-link>
      </p>
    </template>
  </FormWrapper>
</template>

<style scoped lang="scss">
.sign-in:not(:disabled):hover {
  cursor: pointer;
}
#sign-in {
  width: 100%;
  border-radius: 2px;
  margin: 0;
  height: 40px;
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
