<template>
  <div class="mx-6 flex flex-col items-center gap-0 sm:flex-row sm:items-start sm:justify-center sm:gap-16 md:mx-20">
    <div class="aspect-[3/4] w-4/5 py-4 sm:w-[35%]">
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
    <div class="flex w-full flex-col gap-8 py-4 sm:w-2/5">
      <p class="text-3xl font-bold lg:text-4xl">Брюки палаццо со льном</p>
      <p class="text-3xl font-black text-[rgb(110,15,23)]">Sale</p>
      <div class="flex flex-wrap items-center gap-4">
        <p class="text-3xl font-bold lg:text-4xl">3 400000 ₽</p>
        <p class="text-2xl font-bold text-gray-400 line-through lg:text-4xl">4 400000 ₽</p>
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
        Роскошные брюки палаццо с характерным выразительным свободным кроем и посадкой на талии. Визуально вытягивают рост. Брюки выполнены из смесового материала на основе тенсела
        с добавлением льна. Такой материал шелковистый и тактильно приятный. Легкий и прочный, хорошо регулирует температуру, охлаждая в жаркое время. Экологичный и
        гипоаллергенный. Брюки на подкладке и с боковыми карманами. Универсальный и элегантный вариант для повседневных и вечерних образов. Для максимального вытягивания силуэта
        носите с обувью на каблуке. На модели размер S. Параметры модели: рост 176, 89-67-94.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, type Ref, ref } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import VueEasyLightbox from 'vue-easy-lightbox';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';

defineComponent({
  components: {
    Splide,
    SplideSlide,
    VueEasyLightbox
  }
});

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
