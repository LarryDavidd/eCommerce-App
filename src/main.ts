import '@app/styles/tailwind.scss';
import '@app/styles/main.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@app/App.vue';
import router from '@app/router';

import { useCostumerStore } from '@entities/Costumer';

const app = createApp(App);

app.use(createPinia());

useCostumerStore()
  .LoginExistigCostumer()
  .then(() => {
    app.use(router);

    app.mount('#app');
  });
