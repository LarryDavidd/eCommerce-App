<script lang="ts" setup>
import AuthModal from '@features/ui/Forms/AuthForm.vue';

console.log('Hello');
</script>

<template>
  <div class="flex h-dvh w-dvw bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <AuthModal />
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
