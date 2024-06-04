<script setup lang="ts">
import useProfileStore from '@/entities/Profile';
import UserProfilePage from './UserProfilePage.vue';

const profileStore = useProfileStore();
profileStore.requestCostumer().then(() => console.log(profileStore.getCostumer));
</script>

<template>
  <template v-if="profileStore.getCostumer !== null">
    <UserProfilePage :credentials="profileStore.getCostumer" />
  </template>
</template>
