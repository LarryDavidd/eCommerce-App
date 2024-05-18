<script lang="ts" setup>
import router from '@/app/router';
import { useCostumerStore } from '@/entities/Costumer/store/costumerStore';
import AuthForm from '@pages/LoginPage/components/AuthForm/AuthForm.vue';
// import { useNotificationStore } from '@app/store/useAlertMessage';

const costumerStore = useCostumerStore();

const login = (data: { email: string; password: string }) => {
  console.log(data);
  costumerStore.LoginCostumer(data.email, data.password).then((data) => {
    if (data.isLogined.value) router.push({ name: 'home' });
  });
};
// const appStore = useNotificationStore();
// const addNotify = () => {
//   const notification = {
//     id: Date.now(),
//     message: 'zaza',
//     type: 'error'
//   };
//   appStore.addNotification(notification);
// };
</script>

<template>
  <!--  <span @click="addNotify">123</span>-->
  <div class="page-wrapper flex bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center md:h-screen lg:py-0">
      <AuthForm @submitForm="login" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  padding: 40px;
}
@media (max-width: 400px) {
  .page-wrapper {
    padding: 80px 20px;
  }
}
.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
}
</style>
