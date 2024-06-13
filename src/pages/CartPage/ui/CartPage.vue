<template>
  <div class="wrapper">
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
      v-if="arrayProduct.length > 0"
    >
      <div class="products-block">
        <div
          class="product-elem"
          v-for="product in arrayProduct"
          :key="product.productId"
        >
          <CartCard
            :product-id="product.productId"
            :size="product.size"
            :price="product.price"
            :count="product.count"
            :name="product.name"
            :url-imgs="product.urlImgs"
            :discount="product.discount ? product.discount : null"
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
import CartCard from '@entities/CartCard';
import CartReceipt from '@entities/CartReceipt/ui/CartReceipt.vue';
import PromoCodesList from '@entities/PromoCodesList/ui/PromoCodesList.vue';
import EmptyCart from '@entities/EmptyCart/ui/EmptyCart.vue';

type ProductElem = {
  count: number; //quantity
  productId: number; //
  price: string; //price
  name: string; //
  discount?: string; //totalPrice
  size: string; //variant.attributes.find((el)=>el.name==='size').value
  urlImgs: string[]; //variant.images.map((el)=>el.url)
};

let receiptData = {
  total: '800 $', //elem.total (typeof elem===Cart)
  price: '1900 $',
  discount: '1100 $', //elem.discountOnTotalPrice
  delivery: '0 $'
};
let promoCodes: string[] = ['asasa', 'bsbbsb'];
let arrayProduct: ProductElem[] = [
  {
    name: 'Dress',
    productId: 1,
    size: 'xs',
    price: '5050 $',
    count: 2,
    urlImgs: [
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/e1d/e1dcaddcc2b601226e2f1e420cf8b7e4/6d016c8434cefcb2bbc3b7913e60e20a.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/6e5/6e57a17ad59a79572cc63c35c707dcb3/688371b85619f5f1a709d34364bc5451.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/14d/14d7785d8e2ba001584b50109bf3326a/7cce0a93fd1d9f74f69826d014c6c049.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/c36/c36edba7dfad1f33b2cbbe8853ffaafd/59cc5dba5feec14859f3395a02ad4b1e.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/9ec/9ecd300c6eb1960918e8efe4396967c3/b8beded126408d6f5e7a4e459832c23d.jpg'
    ]
  },
  {
    name: 'Trouses',
    productId: 2,
    size: 'L',
    price: '1400 $',
    count: 3,
    urlImgs: [
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/e1d/e1dcaddcc2b601226e2f1e420cf8b7e4/6d016c8434cefcb2bbc3b7913e60e20a.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/6e5/6e57a17ad59a79572cc63c35c707dcb3/688371b85619f5f1a709d34364bc5451.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/14d/14d7785d8e2ba001584b50109bf3326a/7cce0a93fd1d9f74f69826d014c6c049.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/c36/c36edba7dfad1f33b2cbbe8853ffaafd/59cc5dba5feec14859f3395a02ad4b1e.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/9ec/9ecd300c6eb1960918e8efe4396967c3/b8beded126408d6f5e7a4e459832c23d.jpg'
    ],
    discount: '680 $'
  },
  {
    name: 'Coat',
    productId: 3,
    size: 'M',
    price: '8900 $',
    count: 1,
    urlImgs: [
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/e1d/e1dcaddcc2b601226e2f1e420cf8b7e4/6d016c8434cefcb2bbc3b7913e60e20a.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/6e5/6e57a17ad59a79572cc63c35c707dcb3/688371b85619f5f1a709d34364bc5451.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/14d/14d7785d8e2ba001584b50109bf3326a/7cce0a93fd1d9f74f69826d014c6c049.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/c36/c36edba7dfad1f33b2cbbe8853ffaafd/59cc5dba5feec14859f3395a02ad4b1e.jpg',
      'https://e930f744-2554-4589-81f4-fda27b4a4a59.selcdn.net/iblock/9ec/9ecd300c6eb1960918e8efe4396967c3/b8beded126408d6f5e7a4e459832c23d.jpg'
    ],
    discount: '890 $'
  }
];

// let arrayProduct = [];
const deleteProduct = (id: number) => {
  console.log('delete', id);
};
const changeCount = (count: number, id: number) => {
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
  padding: 22px 40px;
  align-items: center;
  display: flex;
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
