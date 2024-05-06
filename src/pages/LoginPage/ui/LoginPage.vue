<script lang="ts" setup>
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import { computed, ref } from 'vue';
import OpenedEye from '@shared/ui-kit/Icons/OpenedEye.vue';
import ClosedEye from '@shared/ui-kit/Icons/ClosedEye.vue';
const creds = ref({
  email: '',
  password: ''
});
const error = ref(null);
function checkInput(event: string) {
  // console.log('event', event);
  return event;
}
const isVisible = ref(false);
const iconColor = ref('#D6DBE4');

const nameIsValid = ref(false);
const passwordIsValid = ref(false);

const isButtonValid = computed(() => nameIsValid.value && passwordIsValid.value);

const login = () => {
  // const response = await ...
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <a
        href="#"
        class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="mr-2 size-8"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">Sign in to your account</h1>
          <form
            @submit.prevent="login"
            class="form space-y-4 md:space-y-6"
            action="#"
          >
            <SimpleInput
              v-model="creds.email"
              title="name"
              placeholder="Email"
              :required="true"
              :error="error"
              name="input"
              @update:modelValue="checkInput"
              style="position: relative"
              type="text"
              max-width="100%"
            />
            <SimpleInput
              max-width="100%"
              v-model="creds.password"
              title="name"
              placeholder="Password"
              :required="true"
              :error="error"
              name="input"
              @update:modelValue="checkInput"
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
                  style="position: absolute; top: 20px; right: 20px; transform: translateY(-50%)"
                  v-else
                  @click="isVisible = !isVisible"
                />
              </template>
            </SimpleInput>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 size-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-gray-500 dark:text-gray-300"
                    >Remember me</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              :disabled="!isButtonValid"
              style="color: #1c1e1c"
              class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              Войти
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                href="#"
                class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >Sign up</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
}
</style>
