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
    class="mx-6 flex flex-wrap justify-center gap-x-8 gap-y-28 md:mx-20"
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
      :sizes="product.sizeValues"
    >
    </ProductCard>
  </section>
  <CustomLoading v-else />
</template>
