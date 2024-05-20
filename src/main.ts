import '@app/styles/tailwind.scss';
import '@app/styles/main.scss';
import '@vuepic/vue-datepicker/dist/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import App from '@app/App.vue';
import router from '@app/router';
import { useCostumerStore } from './entities/Costumer/store/costumerStore';

const app = createApp(App);
app.component('VueDatePicker', VueDatePicker);
app.use(createPinia());

useCostumerStore()
  .LoginExistigCostumer()
  .then(() => {
    app.use(router);
    app.mount('#app');
  });
// Ультра мега костыль исправить как можно скорее!!!
