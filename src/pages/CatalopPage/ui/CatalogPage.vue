<script lang="ts" setup>
import CatalogFilter from '@features/CatalogFilter';
import BurgerButton from '@shared/ui-kit/Buttons/BurgerButton/BurgerButton.vue';
import { ref } from 'vue';
import ProductList from '@entities/Product';
const isFilterVisible = ref(true);
</script>

<template>
  <BurgerButton v-model="isFilterVisible" />
  <CatalogFilter />
  <ProductList />
</template>
