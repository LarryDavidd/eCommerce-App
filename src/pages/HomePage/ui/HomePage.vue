<template>
  <div>home page</div>
  <button
    class="btn btn-primary"
    @click="logout"
  >
    logout
  </button>
</template>

<script lang="ts" setup>
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';

const logout = () => {
  if (useCostumerStore().isLogined) useCostumerStore().LogoutCostumer();
};
</script>
