import '@app/styles/tailwind.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@app/App.vue';
import router from '@app/router';

import { useCostumerStore } from './entities/Costumer/store/costumerStore';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount('#app');

useCostumerStore().LogoutCostumer();

// new CostumerApi().credentialsCostumer();
// new CostumerApi().loginCostumer('seb@example.uk', 'asdfjkl1A');
// new CostumerApi().anonCostumer();
