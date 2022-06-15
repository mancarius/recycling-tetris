import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import './styles/style.module.scss';
import 'nes.css/css/nes.min.css';
import 'nes.icons/css/nes-icons.min.css';

createApp(App).use(store).mount('#app');
