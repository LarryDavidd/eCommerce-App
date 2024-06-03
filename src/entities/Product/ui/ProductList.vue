<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '../store/productStore';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '@shared/components/productCard';
import Loading from '@shared/ui-kit/Loading/CustomLoading.vue';
import CustomLoading from '@shared/ui-kit/Loading/CustomLoading.vue';

const productStore = useProductStore();

const data = ref<ProductProjection[]>([]);

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
    >
    </ProductCard>
  </section>
  <CustomLoading v-else />
</template>
