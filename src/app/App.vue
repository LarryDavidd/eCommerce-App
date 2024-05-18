<script setup lang="ts">
import { RouterView } from 'vue-router';
import { MainHeader } from '@widgets/MainHeader';
import { MainFooter } from '@shared/components/MainFooter';
import AlertMessage from '@shared/components/Alert/ui/AlertMessages.vue';
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
  <AlertMessage />
</template>
