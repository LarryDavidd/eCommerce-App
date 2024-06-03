<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref, watchEffect } from 'vue';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import type { Image } from '@commercetools/platform-sdk';

type PropsType = {
  urlImg: Image[];
};

const props = defineProps<PropsType>();

const images = props.urlImg.map((img) => img.url);

// const images: string[] = [
//   'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/e1d/e1dcaddcc2b601226e2f1e420cf8b7e4/6d016c8434cefcb2bbc3b7913e60e20a.jpg',
//   'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/6e5/6e57a17ad59a79572cc63c35c707dcb3/688371b85619f5f1a709d34364bc5451.jpg',
//   'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/14d/14d7785d8e2ba001584b50109bf3326a/7cce0a93fd1d9f74f69826d014c6c049.jpg',
//   'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/c36/c36edba7dfad1f33b2cbbe8853ffaafd/59cc5dba5feec14859f3395a02ad4b1e.jpg',
//   'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/9ec/9ecd300c6eb1960918e8efe4396967c3/b8beded126408d6f5e7a4e459832c23d.jpg'
// ];

const bgWidth: Ref<number> = ref(0);
const mousePositionX = ref(0);
const bgContainer: Ref<HTMLDivElement | null> = ref(null);
let resizeObserver: ResizeObserver | null = null;
const backgroundIndex = ref(0);
const mousePositionControl = ref(0);
const isChecked = ref(false);

//swiper

const startX = ref(0);
const endX = ref(0);

const startTouch = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX;
};

const moveTouch = (event: TouchEvent) => {
  if (!startX.value) {
    return;
  }

  endX.value = event.touches[0].clientX;

  const diffX = startX.value - endX.value;

  if (diffX > 10) {
    nextSlide();
  } else if (diffX < -10) {
    prevSlide();
  }

  startX.value = 0;
  endX.value = 0;
};

const nextSlide = () => {
  if (backgroundIndex.value < images.length - 1) {
    backgroundIndex.value++;
  } else {
    backgroundIndex.value = 0;
  }
};

const prevSlide = () => {
  if (backgroundIndex.value > 0) {
    backgroundIndex.value--;
  } else {
    backgroundIndex.value = images.length - 1;
  }
};
// swiper end
const toggleChecked = () => {
  isChecked.value = !isChecked.value;
};

watchEffect(() => {
  if (mousePositionControl.value !== mousePositionX.value) {
    backgroundIndex.value = Math.floor(mousePositionX.value / (bgWidth.value / images.length));
    mousePositionControl.value = mousePositionX.value;
  }
});

const mousePosition = (event: MouseEvent) => {
  const elem: MouseEvent | null = event;
  const value: number = elem.offsetX;
  mousePositionX.value = Math.abs(value - 1);
};

const onResize = (entries: ResizeObserverEntry[]) => {
  for (let entry of entries) {
    bgWidth.value = entry.contentRect.width;
  }
};

onMounted(() => {
  const elem = bgContainer.value;
  if (!elem) throw new Error('Element not found');
  bgWidth.value = elem.offsetWidth;
});

onMounted(() => {
  const resizeObserver = new ResizeObserver(onResize);
  if (bgContainer.value) {
    resizeObserver.observe(bgContainer.value);
  }
});

onUnmounted(() => {
  if (resizeObserver && bgContainer.value) {
    (resizeObserver as ResizeObserver).unobserve(bgContainer.value);
  }
});
</script>

<template>
  <div
    ref="bgContainer"
    :style="{ backgroundImage: `url(${images[backgroundIndex]})` }"
    class="bg flex flex-row-reverse"
    @mousemove="mousePosition"
    @touchstart="startTouch"
    @touchmove="moveTouch"
  >
    <LikeHeart
      :class="{ checked: isChecked }"
      @click="toggleChecked"
      class="cursor-pointer"
    ></LikeHeart>
  </div>
</template>

<style scoped lang="scss"></style>
