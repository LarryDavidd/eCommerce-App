<script lang="ts" setup>
import { computed } from 'vue';
import { useRegistrationStore } from '@app/stores/registration';
import FirstStep from '@features/ui/Forms/FirstStep/FirstStep.vue';
import SecondStep from '@features/ui/Forms/SecondStep/SecondStep.vue';
import ThirdStep from '@features/ui/Forms/ThirdStep/ThirdStep.vue';
import ForthStep from '@features/ui/Forms/ForthStep/ForthStep.vue';

const store = useRegistrationStore();
const currentComponentKey = computed(() => `component-${store.step}`);
const currentComponent = computed(() => {
  switch (store.step) {
    case 1:
      return FirstStep;
    case 2:
      return SecondStep;
    case 3:
      return ThirdStep;
    case 4:
      return ForthStep;
    default:
      return FirstStep;
  }
});
</script>

<template>
  <div class="flex h-dvh w-dvw bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <transition
        name="fade"
        mode="out-in"
      >
        <component
          :is="currentComponent"
          :key="currentComponentKey"
        />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    padding-top 0.5s,
    padding-bottom 0.5s;
  overflow: hidden;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
