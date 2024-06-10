<script setup lang="ts">
import useCartStore from '@/entities/Cart';
import ButtonIconCounter from '@/shared/ui-kit/Buttons/ButtonIconCounter/ButtonIconCounter.vue';
import CartIcon from '@/shared/ui-kit/Icons/CartIcon.vue';
import { computed } from 'vue';

const cartStore = useCartStore();

const count = computed(() => cartStore.getDataCount);
</script>

<template>
  <ButtonIconCounter :count="count">
    <template v-slot:icon>
      <CartIcon />
    </template>
  </ButtonIconCounter>
</template>
