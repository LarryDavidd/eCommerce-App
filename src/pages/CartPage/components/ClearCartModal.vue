<script lang="ts" setup>
import { computed } from 'vue';
import { ModalWrapper } from '@shared/ui-kit/Wrapper';
import { MainButton } from '@shared/ui-kit/Buttons';

type PropsType = {
  cb: () => void;
  isOpen: boolean;
};

const props = defineProps<PropsType>();

const isModalOpen = computed<boolean>(() => props.isOpen);

const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
  emit('update:modelValue');
};

const callCallback = () => {
  props.cb();
  emit('update:modelValue');
};
</script>

<template>
  <ModalWrapper
    :is-open="isModalOpen"
    @close="closeModal"
    class="z-50"
  >
    <div class="p-4 text-center md:p-5">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to clear your cart?</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <MainButton
          name="Yes, i'm sure"
          class="continue"
          :options="{ buttonStyle: 'dark-grey' }"
          @click="callCallback"
        />
        <MainButton
          name="No, cencel"
          class="continue"
          :options="{ buttonStyle: 'dark-grey' }"
          @click="closeModal"
        />
      </div>
    </div>
  </ModalWrapper>
</template>
