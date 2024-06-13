<template>
  <div class="page-wrapper">
    <div class="header-block">
      <div class="header-title">Cart</div>
      <MainButton
        name="Continue shopping"
        class="continue"
        :options="{ buttonStyle: 'light-grey--border-bold' }"
        @click="$router.push('/catalog')"
      />
    </div>
    <div
      class="main-block"
      v-if="lineItems"
    >
      <div class="products-block">
        <div
          class="product-elem"
          v-for="lineItem in lineItems"
          :key="lineItem.lineItemId"
        >
          <CartCard
            :product-id="lineItem.productId"
            :price="lineItem.price"
            :count="lineItem.quantity"
            :name="lineItem.name"
            :url-imgs="lineItem.urlImages"
            :discount="lineItem.discount ? lineItem.discount : null"
            @delete-product="deleteProduct"
            @change-count="changeCount"
          />
        </div>
      </div>
      <div class="overview-block">
        <CartReceipt
          :data="receiptData"
          @input-promo="inputPromo"
        />
        <PromoCodesList
          :promo-codes="promoCodes"
          @delete-promo="deletePromo"
        />
      </div>
    </div>
    <div v-else>
      <EmptyCart />
    </div>
  </div>
</template>
<script setup lang="ts">
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';
import CartCard from '../components/CartCard.vue';
import CartReceipt from '../components/CartReceipt.vue';
import PromoCodesList from '../components/PromoCodesList.vue';
import EmptyCart from '../components/EmptyCart.vue';
import useCartStore from '@/entities/Cart';
import { computed } from 'vue';

const cartStore = useCartStore();

const lineItems = computed(() => cartStore.getLineItems);

let receiptData = {
  total: '800 $', //elem.total (typeof elem===Cart)
  price: '1900 $',
  discount: '1100 $', //elem.discountOnTotalPrice
  delivery: '0 $'
};
let promoCodes: string[] = ['asasa', 'bsbbsb'];

// let arrayProduct = [];
const deleteProduct = (id: number) => {
  cartStore.requestRemoveProductFromCart(String(id));
  console.log('delete', id);
};
const changeCount = (count: number, id: number) => {
  cartStore.requestChangeProductQuantity(String(id), count);
  console.log('change-count', count, id);
};
const inputPromo = (promo: string) => {
  console.log('input', promo);
};
const deletePromo = (promo: string) => {
  console.log('DeletePromo', promo);
};
</script>
<style lang="scss" scoped>
.products-block {
  width: 65%;
  max-width: 1200px;
  padding-right: 40px;
  overflow: auto;
  max-height: 625px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.overview-block {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 30%;
}

.header-title {
  font-weight: bold;
  font-size: 36px;
}

.header-block {
  margin-bottom: 10px;
  border-bottom: 2px solid #d8d7d7;
  padding: 22px 80px;
  align-items: center;
  display: flex;
  gap: 20px;
}

.main-block {
  padding: 90px 80px 50px 80px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.continue {
  width: fit-content;
  padding: 4px 10px;
  margin: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d8d7d7;
  }
}
@media (max-width: 1200px) {
  .main-block {
    padding: 90px 35px;
    align-items: center;
    flex-direction: column;
    gap: 40px;
  }
  .products-block {
    width: 100%;
  }
  .overview-block {
    width: 50%;
  }
}

@media (max-width: 750px) {
  .products-block {
    padding-right: 10px;
  }
  .overview-block {
    width: 100%;
  }
  .promo-list {
    width: 100%;
  }
}

@media (max-width: 550px) {
  .main-block {
    padding: 40px 15px;
  }
  .header-block {
    flex-direction: column;
    padding: 22px 40px;
  }
  .promo-list {
    min-width: 0;
  }
}
</style>
