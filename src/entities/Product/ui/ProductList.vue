<script lang="ts" setup>
import { onMounted } from 'vue';
import { useProductStore } from '../store/productStore';
import { ProductCard } from '@shared/components/productCard';
import CustomLoading from '@shared/ui-kit/Loading/CustomLoading.vue';
import { useFilterStore } from '../store/filterStore';

const productStore = useProductStore();
const filterStore = useFilterStore();

onMounted(() => {
  productStore.requestGetProductByQueryParams();
});
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
    <nav aria-label="Page navigation example">
      <ul class="inline-flex h-10 -space-x-px text-base">
        <li
          class="ms-0 flex h-10 cursor-pointer items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </li>
        <li
          v-for="num in productStore.GetTotalPaginationNumber"
          :class="
            productStore.GetCurrentPaginationNum + 1 === num
              ? 'flex h-10 items-center justify-center border border-gray-300 bg-blue-50 px-4 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
              : 'flex h-10 cursor-pointer items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          "
          :key="num"
        >
          {{ num === productStore.GetCurrentPaginationNum + 1 }}
        </li>
        <li
          class="flex h-10 cursor-pointer items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </li>
      </ul>
    </nav>
  </section>
  <CustomLoading v-else />
</template>
