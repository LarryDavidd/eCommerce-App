<script lang="ts" setup>
import { onMounted } from 'vue';
import { useProductStore } from '../store/productStore';
import { ProductCard } from '@shared/components/productCard';
import CustomLoading from '@shared/ui-kit/Loading/CustomLoading.vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.requestGetProductByQueryParams();
});
</script>

<template>
  <section
    v-if="!productStore.isLoading"
    class="flex flex-wrap justify-center gap-x-8 gap-y-28"
  >
    <ProductCard
      v-for="product in productStore.GetProducts"
      :key="product.id"
      :id="product.id"
      :url-img="product.urlImage"
      :title="product.name"
      :descriptions="product.description"
      :price="product.price"
      :discount="product.discount"
    >
    </ProductCard>
  </section>
  <CustomLoading v-else />
</template>
