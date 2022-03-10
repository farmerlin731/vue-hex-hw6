import { createApp } from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from "./App.vue";
import router from "./router";

// const app = createApp(App).use(router);

// app.use(VueAxios, axios);

// app.mount("#app");

createApp(App)
.use(router)
.use(VueAxios, axios)
.component('Loading', Loading)
.mount('#app')