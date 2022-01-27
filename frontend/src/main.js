import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "../styles/styles.scss"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'
import VCalendar from 'v-calendar';
import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';






Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VCalendar);
locale.use(en);
Vue.component(HistogramSlider.name, HistogramSlider);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')