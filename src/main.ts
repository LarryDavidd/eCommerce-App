import '@app/styles/tailwind.scss';
import '@app/styles/main.scss';
import '@vuepic/vue-datepicker/dist/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import App from '@app/App.vue';
import router from '@app/router';
import { useProductStore } from './entities/Product/store/productStore';

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.use(createPinia());

app.use(router);

app.mount('#app');

useProductStore()
  .requestGetProduct()
  .then((data) => console.log(data));

useProductStore()
  .requestGetProductsByCategory(['7b172f57-cde7-4f2d-a76a-53a96313278a'])
  .then((data) => console.log(data));

useProductStore()
  .requestProductSearch('en', 'a')
  .then((data) => console.log(data));
