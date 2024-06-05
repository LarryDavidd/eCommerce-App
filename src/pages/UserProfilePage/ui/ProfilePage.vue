<script setup lang="ts">
import useProfileStore from '@/entities/Profile';
import UserProfilePage from './UserProfilePage.vue';

const profileStore = useProfileStore();
profileStore.requestCostumer();
</script>

<template>
  <template v-if="profileStore.getCostumer !== null">
    <UserProfilePage />
  </template>
</template>
