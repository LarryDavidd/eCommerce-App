import '@app/styles/tailwind.scss';
import '@app/styles/main.scss';
import '@vuepic/vue-datepicker/dist/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import App from '@app/App.vue';
import router from '@app/router';
import { useCostumerStore } from './entities/Costumer/store/costumerStore';
// import useCartStore from './entities/Cart';
// import getClient from './auth/client/get-client';
// import { useProductStore } from './entities/Product/store/productStore';
// import { useCategoriesStore } from './entities/Categories/store/categoriesStore';

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.use(createPinia());

useCostumerStore()
  .LoginExistigCostumer()
  .then(() => {
    app.use(router);

    app.mount('#app');
  });

// useCartStore()
//   .requestCreateAnonCart({ currency: 'USD' })
//   .then((cart) => console.log(cart));

// useCartStore()
//   .requestGetCart()
//   .then((cart) => console.log(cart));

// getClient().then((res) => console.log(res));

// useProductStore()
//   .requestGetProduct()
//   .then((data) => console.log(data));

// useProductStore()
//   .requestGetProductById('21f7c944-ae91-4c3c-a687-dbe1a7041f51')
//   .then((data) => console.log(data));

// useProductStore()
//   .requestGetProductsByCategory(['7b172f57-cde7-4f2d-a76a-53a96313278a', '8ce86a8c-1ed5-4cfa-a8f6-fd75db28ed51'])
//   .then((data) => console.log(data));

// useProductStore()
//   .requestProductSearch('Crystal')
//   .then((data) => console.log(data));

// useCategoriesStore()
//   .requestGetCategories()
//   .then((data) => console.log(data));
