<template>
  <div class="aaa mx-6 flex justify-between md:mx-20">
    <div>home page</div>
    <div class="flex gap-4">
      <router-link to="/login">
        <p class="underline hover:text-blue-500">Login</p>
      </router-link>
      <router-link to="/registration">
        <p class="underline hover:text-blue-500">Registration</p>
      </router-link>
      <p
        class="cursor-pointer underline hover:text-blue-500"
        @click="logout"
      >
        logout
      </p>
    </div>
    <FilterBlock />
  </div>
</template>

<script lang="ts" setup>
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';
import FilterBlock from '@features/Filter/ui/FilterBlock.vue';

const logout = () => {
  if (useCostumerStore().isLogined) useCostumerStore().LogoutCostumer();
};
</script>
<style lang="scss" scoped>
.filter-wrapper {
  min-width: 250px;
}
.aaa {
  background-color: white;
}
</style>
