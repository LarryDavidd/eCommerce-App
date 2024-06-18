<script setup lang="ts">
import { computed, ref } from 'vue';
import { type DiscountCodeReference } from '@commercetools/platform-sdk';
import router from '@app/router';
import useCartStore from '@entities/Cart';
import CartCard from '../components/CartCard.vue';
import CartReceipt from '../components/CartReceipt.vue';
import PromoCodesList from '../components/PromoCodesList.vue';
import EmptyCart from '../components/EmptyCart.vue';
import ClearCartModal from '../components/ClearCartModal.vue';
import { MainButton } from '@shared/ui-kit/Buttons';

// state
const cartStore = useCartStore();

const isModalOpen = ref<boolean>(false);

// computed
const inProcessProducts = computed(() => cartStore.getInProcess);

const lineItems = computed(() => cartStore.getLineItems ?? []);

const totalPriceWithoutDiscount = computed(() => cartStore.getTotalPriceWithotDiscount);

const totalPrice = computed(() => cartStore.getTotalPrice);

const totalCount = computed(() => cartStore.getTotalCount);

const discountCodes = computed(() => cartStore.getDiscountCodes);

const discountOnTotalPrice = computed(() => cartStore.getDiscountOnTotalPrice);

// methods
const deleteProduct = (id: number) => {
  cartStore.requestRemoveProductFromCart(String(id));
};

const changeCount = (count: number, id: number) => {
  cartStore.requestChangeProductQuantity(String(id), count);
};

const inputPromo = (promo: string) => {
  cartStore.requestAddDiscountCode(promo);
};

const deletePromo = (promo: DiscountCodeReference) => {
  cartStore.requestRemoveDiscountCode(promo);
};

const clearCart = () => {
  if (lineItems.value.length > 0) cartStore.requestClearCart();
};
</script>
<template>
  <div class="wrapper">
    <div class="header-block flex flex-col flex-wrap text-nowrap md:flex-row">
      <div class="header-title">Cart</div>
      <MainButton
        name="Continue shopping"
        class="continue"
        :options="{ buttonStyle: 'light-grey--border-bold' }"
        @click="router.push('/catalog')"
      />
      <MainButton
        name="Clear Cart"
        class="continue"
        :options="{ buttonStyle: 'light-grey--border-bold' }"
        @click="isModalOpen = true"
      />
    </div>
    <div
      class="main-block"
      v-if="lineItems.length > 0"
    >
      <div class="products-block">
        <div
          class="product-elem"
          v-for="lineItem in lineItems"
          :key="lineItem.lineItemId"
        >
          <CartCard
            :is-in-process="inProcessProducts.has(lineItem.productId)"
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
          :total-price-without-discount="totalPriceWithoutDiscount"
          :total-price="totalPrice"
          :total-count="totalCount"
          :discount-on-total-price="discountOnTotalPrice"
          @input-promo="inputPromo"
        />
        <PromoCodesList
          :discount-codes="discountCodes"
          @delete-promo="deletePromo"
        />
      </div>
    </div>
    <div v-else>
      <EmptyCart />
    </div>
    <ClearCartModal
      :cb="clearCart"
      :is-open="isModalOpen"
      @update:model-value="isModalOpen = !isModalOpen"
    />
  </div>
</template>
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
  padding: 22px 40px;
  align-items: center;
  gap: 20px;
}

.main-block {
  padding: 90px 40px 50px;
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
    padding: 90px 40px;
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
    padding: 40px 16px;
  }
  .header-block {
    flex-direction: column;
    padding: 22px 16px;
  }
  .promo-list {
    min-width: 0;
  }
}
</style>
