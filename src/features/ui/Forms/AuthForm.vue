<script setup lang="ts">
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import { computed, ref } from 'vue';
import OpenedEye from '@shared/ui-kit/Icons/OpenedEye.vue';
import ClosedEye from '@shared/ui-kit/Icons/ClosedEye.vue';
import { validateEmail } from '@/utils/validation';
import { validatePassword } from '@/utils/validation';

const creds = ref({
  email: '',
  password: ''
});

const errorsEmail = ref<null | string[]>(null);
const errorsPassword = ref<null | string[]>(null);
const handleSubmit = () => {
  console.log('click');
};

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
  // const response = await ...
  console.log('login');
};
</script>

<template>
  <form
    @submit.prevent="login"
    class="auth-wrapper flex flex-col items-center gap-2"
  >
    <div class="title text-2xl">Sign in to your account</div>
    <SimpleInput
      v-model="creds.email"
      title="email"
      placeholder="Email"
      :required="true"
      :error="errorsEmail"
      name="input"
      @update:modelValue="checkEmail"
      style="position: relative"
      type="text"
      max-width="300px"
    />
    <SimpleInput
      max-width="300px"
      v-model="creds.password"
      title="password"
      placeholder="Password"
      :required="true"
      :error="errorsPassword"
      name="input"
      @update:modelValue="checkPassword"
      style="position: relative"
      :type="isVisible ? 'text' : 'password'"
    >
      <template #before>
        <opened-eye
          style="cursor: pointer; position: absolute; top: 20px; right: 20px; transform: translateY(-50%)"
          v-if="isVisible"
          @click="isVisible = !isVisible"
          :color="iconColor"
          @mouseover="iconColor = '#b5bac2'"
          @mouseleave="iconColor = '#D6DBE4'"
        />

        <closed-eye
          style="cursor: pointer; position: absolute; top: 20px; right: 20px; transform: translateY(-50%)"
          v-else
          :color="iconColor"
          @mouseover="iconColor = '#b5bac2'"
          @mouseleave="iconColor = '#D6DBE4'"
          @click="isVisible = !isVisible"
        />
      </template>
    </SimpleInput>
    <button
      type="submit"
      :disabled="!isValidInputData"
      @click="handleSubmit"
      style="color: #ffffff; background-color: #515151; max-width: 300px"
      class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
    >
      Sign in
    </button>
    <p>
      Don't you have an account?
      <a
        href="/registration"
        class="text-gray-600 underline duration-200 hover:text-gray-900"
        >Register</a
      >
    </p>
  </form>
</template>

<style scoped lang="scss">
.auth-wrapper {
  background-color: #e8e7e7;
  padding: 20px 50px;
}

button:disabled {
  opacity: 0.5;
}
</style>
