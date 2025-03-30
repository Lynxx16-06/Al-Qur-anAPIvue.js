import './assets/main.css';

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import PrimeVue from "primevue/config";

// import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import AOS from 'aos';
import 'aos/dist/aos.css';

import en from './locales/en.json';
import id from './locales/id.json';
import jp from './locales/jp.json';
import zh from './locales/zh.json';
import ko from './locales/ko.json';

// Ambil bahasa yang tersimpan, default ke 'en'
const savedLang = localStorage.getItem('lang') || 'en';

const i18n = createI18n({
    legacy: false, 
    locale: savedLang, 
    fallbackLocale: 'en',
    messages: { en, id, jp, zh, ko }
});

const app = createApp(App);

app.use(router);
app.use(ToastService);
app.use(i18n);
app.use(PrimeVue);
AOS.init();
app.mount('#app');

// Pastikan bahasa tetap saat pindah halaman
router.beforeEach((to, from, next) => {
    const lang = localStorage.getItem('lang') || 'en';
    if (i18n.global.locale.value !== lang) {
        i18n.global.locale.value = lang;
    }
    next();
});

// Fungsi global untuk mengganti bahasa
app.config.globalProperties.$setLanguage = (lang) => {
    i18n.global.locale.value = lang;
    localStorage.setItem('lang', lang);
};
