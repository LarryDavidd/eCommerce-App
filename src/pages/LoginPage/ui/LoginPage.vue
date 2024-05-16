<script lang="ts" setup>
import AuthForm from '@pages/LoginPage/components/AuthForm/AuthForm.vue';

const login = () => {
  console.log('login');
};
</script>

<template>
  <div class="flex bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center md:h-screen lg:py-0">
      <AuthForm @submitForm="login" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
}
</style>
