import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import './styles/style.scss';
import 'nes.css/css/nes.min.css';
import 'nes.icons/css/nes-icons.min.css';
import router from './router';
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App);

app.use(store)
app.use(router)
app.use(Vue3TouchEvents);

app.config.errorHandler = (err, instance, info) => {
  console.info(err, info);
}

app.mount('#app');
