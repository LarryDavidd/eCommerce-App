<script setup lang="ts">
import MyAccordion from '@shared/ui-kit/Accordion/MyAccordion.vue';
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import { ref } from 'vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';

interface ReceiptData {
  total: string;
  price: string;
  discount: string;
  delivery: string;
}

const props = defineProps<{ data: ReceiptData }>();
const emit = defineEmits(['inputPromo']);
const promo = ref('');
const inputPromo = () => {
  emit('inputPromo', promo.value);
  promo.value = '';
};
</script>

<template>
  <div class="receipt-wrapper font-medium">
    <div class="title-block">Overview</div>
    <div class="main-block">
      <div class="price-block block">
        <span>Order amount</span>
        <span>{{ props.data.price }}</span>
      </div>
      <div class="discount-block block">
        <span>Your discount</span>
        <span>{{ props.data.discount }}</span>
      </div>
      <div class="delivery-block block">
        <span>The cost of delivery</span>
        <span>{{ props.data.delivery }}</span>
      </div>
      <div class="promo-block block">
        <MyAccordion
          class="accordion"
          title="Do you have a promo code?"
        >
          <div class="promo-input-block flex gap-2">
            <SimpleInput
              v-model="promo"
              placeholder="Enter the promo code"
            />
            <MainButton
              :is-disabled="promo.length === 0"
              name="Apply"
              class="promo-button"
              :options="{ buttonStyle: 'dark-grey' }"
              @click="inputPromo"
            />
          </div>
        </MyAccordion>
      </div>
      <div class="total-block block font-bold">
        <span>Full price</span>
        <span>{{ props.data.total }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-block {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.accordion {
  border: none;
  padding: 0;
  max-width: 100%;
}
.title-block {
  text-align: center;
}
.receipt-wrapper {
  min-width: 340px;
  background-color: #f3f2f3;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}
.block {
  display: flex;
  justify-content: space-between;
}
.promo-button {
  height: auto;
  width: auto;
  padding: 0 10px;
  margin: 0;
  transition: all 0.2s ease;
  &:hover:not(:disabled) {
    background-color: #666666;
  }
  &:disabled {
    opacity: 0.5;
  }
}
@media (max-width: 750px) {
  .receipt-wrapper {
    width: 100%;
  }
}
@media (max-width: 550px) {
  .receipt-wrapper {
    min-width: 0;
  }
}
</style>
