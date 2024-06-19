<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import '@splidejs/vue-splide/css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import VueEasyLightbox from 'vue-easy-lightbox';
import { ProductCounter } from '@shared/ui-kit/Counter';
import { CrossButton } from '@shared/ui-kit/Buttons';

defineComponent({
  components: {
    Splide,
    SplideSlide,
    VueEasyLightbox
  }
});

type PropsType = {
  isInProcess: boolean;
  count: number;
  productId: string;
  price: string;
  name: string;
  discount: string | null;
  urlImgs: string[];
};

const router = useRouter();

const props = defineProps<PropsType>();
// const props = defineProps<LineItem>()
const emit = defineEmits(['deleteProduct', 'changeCount']);
const visible = ref(false);
const index = ref(0);

const openLightbox = (currentIndex: number) => {
  index.value = currentIndex;
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};

const deleteProduct = () => {
  emit('deleteProduct', props.productId);
};

const changeCount = (newCount: number) => {
  emit('changeCount', newCount, props.productId);
};

const redirectToProductDetales = () => {
  router.push({ name: 'product-page', params: { id: props.productId } });
};
</script>

<template>
  <div class="card-wrapper">
    <CrossButton
      class="cross-button"
      @click="deleteProduct"
    />
    <div class="slider-wrapper">
      <Splide
        class="splide-custom"
        :options="{ rewind: true }"
        aria-label="My Card Images"
      >
        <SplideSlide
          v-for="(image, i) in props.urlImgs"
          :key="i"
          @click="openLightbox(i)"
        >
          <img
            class="img"
            :src="image"
            alt="Sample 1"
          />
        </SplideSlide>
      </Splide>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="props.urlImgs"
        :index="index"
        @hide="handleHide"
      />
    </div>
    <div class="wrapper">
      <div class="info-wrapper">
        <span
          class="title"
          @click="redirectToProductDetales"
          >{{ props.name }}</span
        >
        <div class="data-block">
          <span class="data-title">Count:</span>
          <ProductCounter
            :is-in-process="props.isInProcess"
            :count="props.count"
            @update:model-value="changeCount"
          />
        </div>
      </div>
      <div class="price-wrapper">
        <div
          class="price whitespace-nowrap font-semibold"
          :class="{ 'grey cross-text line-through': props.discount }"
        >
          <span v-if="!props.discount">Total: </span>{{ props.price }}
        </div>
        <div
          v-if="props.discount"
          class="discount-block"
        >
          <span class="whitespace-nowrap">Price:</span>
          <span class="total-price whitespace-nowrap font-bold">{{ props.discount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cross-button {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    .line {
      background-color: red;
    }
  }
}

.card-wrapper {
  overflow: hidden;
  max-height: 300px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #a6a5a5;
  position: relative;
}

.slider-wrapper {
  overflow: hidden;
  min-height: 250px;
  background-color: #ffffff;
  width: 400px;
}

.cross-text {
  color: #c4c4c4;
}

.price {
  text-align: end;
}

.total-price {
  color: darkred;
}

.info-wrapper {
  align-self: center;
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  color: black;
}

.discount-block {
  flex-wrap: nowrap;
  display: flex;
  gap: 5px;
}

.price-wrapper {
  align-self: end;
  font-weight: bold;
  font-size: 24px;
  margin-left: auto;
  //align-self: center;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.data-block {
  display: flex;
  gap: 15px;
}

.data-title {
  width: 80px;
}

.title {
  font-weight: bold;
  font-size: 24px;
}

.splide-custom {
  height: calc(100% - 20px);
}

.img {
  object-fit: cover;
}

@media (max-width: 750px) {
  .wrapper {
    flex-direction: column;
  }
}

@media (max-width: 550px) {
  .slider-wrapper {
    height: 150px;
  }
  .splide-custom {
    height: auto;
  }
}
</style>
