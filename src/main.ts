import '@app/styles/tailwind.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@app/App.vue';
import router from '@app/router';
import CostumerApi from './entities/Costumer/api/costumerApi';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount('#app');

new CostumerApi().existingCostumer();
// new CostumerApi().loginCostumer('seb@example.uk', 'asdfjkl1A');
// new CostumerApi().anonCostumer();
