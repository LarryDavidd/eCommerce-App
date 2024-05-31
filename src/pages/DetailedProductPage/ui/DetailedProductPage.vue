<template>
  <div class="test mx-20 py-4">
    <Splide
      :options="{ rewind: true }"
      aria-label="My Favorite Images"
    >
      <SplideSlide
        v-for="(image, i) in images"
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
      :imgs="images"
      :index="index"
      @hide="handleHide"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import VueEasyLightbox from 'vue-easy-lightbox';

defineComponent({
  components: {
    Splide,
    SplideSlide,
    VueEasyLightbox
  }
});

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
.test {
  width: 30%;
  aspect-ratio: 3 / 5;
}
</style>
