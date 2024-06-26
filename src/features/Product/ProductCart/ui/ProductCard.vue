<script setup lang="ts">
import ProductCardSwiper from './ProductCardSwiper.vue';
import { type Ref, ref } from 'vue';
import type { Image } from '@commercetools/platform-sdk';
import AddRemoveButton from '../../AddRemoreButton';

const changeSize = (value: string) => {
  sizeSelected.value = value;
};

type PropsType = {
  id: string;
  urlImg: Image[];
  title: string;
  descriptions: string;
  price: string;
  discount?: string;
  sizes: string[] | [];
};

const props = defineProps<PropsType>();
const sizeSelected: Ref<string> = ref(props.sizes.length > 0 ? props.sizes[0] : '');
const shortDescription = props.descriptions.split('.').shift();
</script>

<template>
  <div class="product-card flex flex-col">
    <ProductCardSwiper
      :discount="!!discount"
      :url-img="props.urlImg"
      :prod-id="props.id"
    />
    <div class="description">
      <p>{{ props.title }}</p>
      <div class="flex gap-4">
        <p
          class="font-semibold"
          v-if="props.discount"
        >
          {{ props.discount }}
        </p>
        <p :class="{ 'strike-through line-through': props.discount, 'font-semibold': !props.discount }">
          {{ props.price }}
        </p>
      </div>
    </div>
    <div class="to-cart flex flex-col justify-between">
      <div>
        <p class="text-[12px] text-gray-700">{{ shortDescription }}</p>
        <div
          class="flex gap-5"
          v-if="sizes.length > 0"
        >
          <p>Size:</p>
          <div class="flex gap-2.5">
            <div
              v-for="size in sizes"
              :key="size"
              :class="{ selected: size === sizeSelected }"
              @click="changeSize(size)"
              class="size-btn cursor-pointer"
            >
              {{ size }}
            </div>
          </div>
        </div>
      </div>
      <AddRemoveButton
        classes="card-btn"
        :id="props.id"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected,
.size-btn:hover {
  color: red;
}
.card-btn {
  width: 100%;
  height: auto;
  align-self: center;
  padding: 10px;
}
.product-card {
  position: relative;
  width: 400px;
}
.description {
  padding: 0 15px;
}
.bg {
  box-sizing: border-box;
  background-size: cover;
  background-position: center;
  width: 100%;
  aspect-ratio: 2 / 3;
}
.strike-through {
  text-decoration-color: red; /* Цвет зачеркивания */
  text-decoration-thickness: 0.5px; /* Толщина зачеркивания */
}
.to-cart {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 140px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  background: #fff;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  z-index: 2;
}
.product-card:hover .to-cart {
  opacity: 1;
  box-shadow: 0 15px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(140px);
}
.product-card:hover {
  box-shadow: 0 15px 16px rgba(0, 0, 0, 0.1);
}
</style>
