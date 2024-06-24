<script setup lang="ts">
import { MainButton } from '@shared/ui-kit/Buttons';
</script>

<template>
  <div class="wrapper px-4 md:px-10">
    <div class="mb-4 flex w-full flex-col items-center sm:items-start">
      <div class="background md:h-70vh flex w-full bg-contain bg-center bg-no-repeat py-5 text-center sm:bg-right-top sm:py-20 sm:text-left">
        <div class="flex flex-col justify-between gap-6 font-bold text-black sm:w-3/5 md:justify-center">
          <p class="text-3xl md:text-5xl">Oops... Page not found :/</p>
          <p class="text-1xl md:text-2xl">We are already working on fixing this error.</p>
        </div>
      </div>
      <router-link to="/">
        <MainButton
          name="return to homepage"
          :options="{ buttonStyle: 'dark-grey' }"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.background {
  height: 23rem;
  background-image: url('../../../shared/assets/images/clothes_hanger.png');
}
@media (max-width: 1024px) {
  .background {
    background-size: 25rem;
  }
}
@media (max-width: 767px) {
  .background {
    background-size: 15rem;
  }
}
</style>
