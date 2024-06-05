<template>
  <template v-if="!productStore.isLoading">
    <div class="mx-6 flex flex-col items-center gap-0 sm:flex-row sm:items-start sm:justify-center sm:gap-16 md:mx-20">
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
      <div class="flex w-full flex-col gap-8 py-4 sm:w-2/5">
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
        <div class="flex gap-4">
          <div
            v-for="(size, i) in sizes"
            :key="i"
            class="size-btn"
            :class="{ selected: size === sizeSelected }"
            @click="changeSize(size)"
          >
            {{ size }}
          </div>
        </div>
        <div class="flex w-full items-center gap-4">
          <MainButton
            name="ADD TO CART"
            :options="{ buttonStyle: 'dark-grey' }"
            class="card-btn m-0 h-auto w-3/4 self-center p-1.5 sm:w-1/2"
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

<script setup lang="ts">
import { defineComponent, type Ref, ref, onMounted, computed } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import VueEasyLightbox from 'vue-easy-lightbox';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';
import { useProductStore } from '@/entities/Product/store/productStore';
import { useRouter } from 'vue-router';
import CustomLoading from '@shared/ui-kit/Loading/CustomLoading.vue';

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

const sizes: string[] = ['XS', 'S', 'M', 'L'];

const sizeSelected: Ref<string> = ref(sizes[0]);

const changeSize = (value: string) => {
  sizeSelected.value = value;
};
const isChecked = ref(false);

const toggleChecked = () => {
  isChecked.value = !isChecked.value;
};

const images = ref<string[]>([
  'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/e1d/e1dcaddcc2b601226e2f1e420cf8b7e4/6d016c8434cefcb2bbc3b7913e60e20a.jpg',
  'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/6e5/6e57a17ad59a79572cc63c35c707dcb3/688371b85619f5f1a709d34364bc5451.jpg',
  'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/14d/14d7785d8e2ba001584b50109bf3326a/7cce0a93fd1d9f74f69826d014c6c049.jpg',
  'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/c36/c36edba7dfad1f33b2cbbe8853ffaafd/59cc5dba5feec14859f3395a02ad4b1e.jpg',
  'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/9ec/9ecd300c6eb1960918e8efe4396967c3/b8beded126408d6f5e7a4e459832c23d.jpg'
]);

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
