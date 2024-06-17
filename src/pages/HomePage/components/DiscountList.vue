<script setup lang="ts">
interface IDiscount {
  title: string;
  code: string;
}

const discountList: IDiscount[] = [
  {
    title: 'Get 25% discount on the total amount in your cart',
    code: 'eR7g8e'
  },
  {
    title: 'Get a 15% discount on the total amount in your cart',
    code: 'qwerty123456'
  },
  {
    title: 'Get a 10% discount on the total amount in your cart',
    code: 'uY95e8'
  },
  {
    title: 'Get a discount of 50 dollars or 50 euros or 5,000 rubles',
    code: 'pT24q3'
  },
  {
    title: 'Get a discount of 100 dollars or 100 euros or 10,000 rubles',
    code: 'AG17h5'
  }
];
</script>

<template>
  <div class="discount-wrap">
    <div class="title font-bold uppercase">Discount List</div>
    <div
      class="discount"
      v-for="(discount, idx) in discountList"
      :key="discount.title"
    >
      <p class="discount-title">{{ idx + 1 }}. {{ discount.title }}</p>
      <span class="font-medium">-</span>
      <p class="discount-code font-medium">{{ discount.code }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.discount-wrap {
  margin-top: 15px;
  width: fit-content;
  padding: 10px;
  border: 1px solid black;
  border-radius: 3px;
}

.discount {
  align-items: center;
  display: flex;
  gap: 20px;
}
</style>
