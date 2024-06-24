<script lang="ts" setup>
import { MainButton } from '@shared/ui-kit/Buttons';
import useCartStore from '@entities/Cart';
import { computed } from 'vue';

const cartStore = useCartStore();

type PropsType = {
  id: string;
  classes: string;
};

const props = defineProps<PropsType>();

const addRemoveProductToCart = () => {
  if (isInCart.value) {
    cartStore.requestRemoveProductFromCart(props.id);
  } else {
    cartStore.requestAddProductToCart(props.id);
  }
};

const isInCart = computed(() => {
  return cartStore.getData?.lineItems.some((lineItem) => lineItem.productId === props.id);
});
</script>

<template>
  <MainButton
    :name="isInCart ? 'DELETE FROM CART' : 'ADD TO CART'"
    :options="{ buttonStyle: 'dark-grey' }"
    :class="props.classes"
    :isLoading="cartStore.getInProcess.has(props.id)"
    @click="addRemoveProductToCart"
  />
</template>
