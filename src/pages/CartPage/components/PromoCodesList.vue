<script setup lang="ts">
import { type DiscountCodeInfo, type DiscountCodeReference } from '@commercetools/platform-sdk';
import { CrossButton } from '@shared/ui-kit/Buttons';

type PropsType = {
  discountCodes?: DiscountCodeInfo[];
};

const props = withDefaults(defineProps<PropsType>(), {
  discountCodes: () => []
});

const emit = defineEmits(['deletePromo']);

const deletePromo = (promo: DiscountCodeReference) => {
  emit('deletePromo', promo);
};
</script>

<template>
  <div class="promo-list">
    <p class="text-center font-medium">Your promo codes</p>
    <ul v-if="props.discountCodes.length > 0">
      <li
        class="text-base-100 promo-item"
        v-for="promo in discountCodes"
        :key="promo.discountCode.id"
      >
        {{ promo.discountCode.typeId }}
        <CrossButton
          class="delete-promo cursor-pointer"
          @click="deletePromo(promo.discountCode)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.promo-list {
  min-width: 340px;
  background-color: #f3f2f3;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}
.delete-promo {
  display: inline-block;
  height: 20px;
  width: 20px;
  top: 50%;
  right: 0;
}
.promo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

@media (max-width: 750px) {
  .promo-list {
    width: 100%;
  }
}

@media (max-width: 550px) {
  .promo-list {
    min-width: 0;
  }
}
</style>
