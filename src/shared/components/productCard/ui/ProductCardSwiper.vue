<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref, watchEffect } from 'vue';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import type { Image } from '@commercetools/platform-sdk';
import { useRouter } from 'vue-router';

type PropsType = {
  urlImg: Image[];
  prodId: string;
};

const props = defineProps<PropsType>();

const images = props.urlImg.map((img) => img.url);

const bgWidth: Ref<number> = ref(0);
const mousePositionX = ref(0);
const bgContainer: Ref<HTMLDivElement | null> = ref(null);
let resizeObserver: ResizeObserver | null = null;
const backgroundIndex = ref(0);
const mousePositionControl = ref(0);
const isChecked = ref(false);

const router = useRouter();

const onClick = () => {
  router.push({ name: 'product-page', params: { id: props.prodId } });
};

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
const toggleChecked = (event: Event) => {
  event.stopPropagation();
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
    class="bg flex cursor-pointer flex-row-reverse"
    @mousemove="mousePosition"
    @touchstart="startTouch"
    @touchmove="moveTouch"
    @click="onClick"
  >
    <LikeHeart
      :class="{ checked: isChecked }"
      @click="toggleChecked"
      class="cursor-pointer"
    ></LikeHeart>
  </div>
</template>

<style scoped lang="scss"></style>
