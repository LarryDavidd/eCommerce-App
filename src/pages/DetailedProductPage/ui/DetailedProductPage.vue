<script setup lang="ts">
import { defineComponent, type Ref, ref, onMounted, computed } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import VueEasyLightbox from 'vue-easy-lightbox';
import '@splidejs/vue-splide/css';
import { useRouter } from 'vue-router';
import { useProductStore } from '@entities/Product/store/productStore';
import CustomLoading from '@shared/ui-kit/Loading/CustomLoading.vue';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import { AddRemoveButton } from '@shared/ui-kit/Buttons';

defineComponent({
  components: {
    Splide,
    SplideSlide,
    VueEasyLightbox
  }
});

const router = useRouter();
const productStore = useProductStore();

onMounted(() => {
  const productId = router.currentRoute.value.params.id;
  productStore.requestGetProductById(productId as string);
});

const product = computed(() => productStore.GetProduct);

const sizeSelected: Ref<string> = ref(product?.value?.sizes[0] || '');

const changeSize = (value: string) => {
  sizeSelected.value = value;
};

const isChecked = ref(false);

const toggleChecked = () => {
  isChecked.value = !isChecked.value;
};

const visible = ref(false);
const index = ref(0);

const openLightbox = (currentIndex: number) => {
  index.value = currentIndex;
  visible.value = true;
};
const handleHide = () => {
  visible.value = false;
};
</script>

<template>
  <template v-if="!productStore.isLoading">
    <div class="wrapper flex flex-col items-center gap-0 px-4 sm:flex-row sm:items-start sm:justify-center sm:gap-16 md:px-10">
      <div class="aspect-[3/4] w-4/5 py-4 sm:w-[35%]">
        <Splide
          :options="{ rewind: true }"
          aria-label="My Favorite Images"
        >
          <SplideSlide
            v-for="(image, i) in product?.urlImages"
            :key="i"
            @click="openLightbox(i)"
          >
            <img
              :src="image"
              alt="Sample 1"
            />
          </SplideSlide>
        </Splide>
        <vue-easy-lightbox
          :visible="visible"
          :imgs="product?.urlImages"
          :index="index"
          @hide="handleHide"
        />
      </div>
      <div class="flex w-full flex-col gap-8 py-4 sm:w-1/2">
        <p class="text-3xl font-bold lg:text-4xl">{{ product?.name }}</p>
        <p
          class="text-3xl font-black text-[rgb(110,15,23)]"
          v-if="product?.discount"
        >
          Sale
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <p
            class="text-3xl font-bold lg:text-4xl"
            v-if="product?.discount"
          >
            {{ product.discount }}
          </p>
          <p
            :class="{ 'text-gray-400 line-through': product?.discount }"
            class="text-2xl font-bold lg:text-4xl"
          >
            {{ product?.priceData.price + ' ' + product?.priceData.currency }}
          </p>
        </div>
        <div
          class="flex gap-4"
          v-if="product && product.sizes.length > 0"
        >
          <div
            v-for="size in product.sizes"
            :key="size"
            class="size-btn"
            :class="{ selected: size === (sizeSelected ? sizeSelected : product.sizes[0]) }"
            @click="changeSize(size)"
          >
            {{ size }}
          </div>
        </div>
        <div class="flex w-full flex-wrap-reverse items-center gap-4">
          <MainButton
            name="ADD TO CART"
            :options="{ buttonStyle: 'dark-grey' }"
            class="card-btn m-0 h-auto self-center p-1.5 sm:w-1/2"
          />
          <LikeHeart
            width="60px"
            height="60px"
            :class="{ checked: isChecked }"
            @click="toggleChecked"
            class="heart cursor-pointer"
          ></LikeHeart>
        </div>
        <p class="text text-2xl">Description:</p>
        <p class="text-small text-[18px] text-gray-700">
          {{ product?.descriptions }}
        </p>
      </div>
    </div>
  </template>
  <CustomLoading v-else />
</template>

<style scoped lang="scss">
.size-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid rgb(0, 0, 0);
  background: rgb(240, 240, 240);
}

.selected,
.size-btn:hover {
  box-shadow: 2px 2px 0 0 rgb(0, 0, 0);
}

.card-btn {
  margin: 0;
}
</style>
