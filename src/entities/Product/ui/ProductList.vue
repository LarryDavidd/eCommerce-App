<script lang="ts" setup>
import { onMounted } from 'vue';
import { useProductStore } from '../store/productStore';
import { ProductCard } from '@shared/components/productCard';
import { PagesLoading } from '@shared/ui-kit/Loading';
import { PaginationLayer } from '@shared/ui-kit/Navigation';

const productStore = useProductStore();

onMounted(() => {
  productStore.requestGetProductByQueryParams();
});

const changePaginationPage = (pageNumber: number) => {
  productStore.requestGetProductByQueryParamsNextPage(pageNumber);
};
</script>

<template>
  <section
    v-if="!productStore.isLoading"
    class="wrapper flex flex-wrap justify-center gap-x-8 gap-y-28 px-4 md:px-10"
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
    <template v-if="productStore.GetTotalPaginationNumber > 1">
      <PaginationLayer
        class="flex w-full justify-center"
        :amount="productStore.GetTotalPaginationNumber"
        :current-page="productStore.GetCurrentPaginationNum"
        @update:model-value="changePaginationPage"
      />
    </template>
  </section>
  <PagesLoading v-else />
</template>
