<script setup lang="ts">
import { RouterView } from 'vue-router';
import { MainHeader } from '@widgets/MainHeader';
import { MainFooter } from '@shared/components/MainFooter';
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>
