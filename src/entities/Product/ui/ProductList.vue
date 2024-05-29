<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '../store/productStore';
import type { ProductProjection } from '@commercetools/platform-sdk';

const productStore = useProductStore();

const data = ref<ProductProjection[]>([]);

onMounted(() => {
  productStore.requestGetProduct();
});
</script>

<template>
  <section
    v-if="!productStore.isLoading"
    class="product-list grid place-items-center gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div
      v-for="product in productStore.GetProducts"
      :key="product.id"
      :id="product.id"
      :url-img="product.urlImage"
      :title="product.name"
      :descriptions="product.description"
      :price="product.price"
      class="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <a href="#">
        <img
          class="rounded-t-lg"
          :src="product.urlImage"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a
          href="#"
          class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </a>
      </div>
    </div>
  </section>
</template>
