
import Vue from 'vue'
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';

import './registerServiceWorker'

let env = window.location.host.includes('localhost') ? 'dev' : 'production'
import config from '@src/config'
window.config = config[env]

import router from './routers/index'
import * as VueGoogleMaps from "vue2-google-maps";
import { VueReCaptcha } from 'vue-recaptcha-v3'
import Notifications from 'vue-notification'
import Store from './store/store';
import VueCookies from 'vue-cookies'
import VueGtag from "vue-gtag";
import VModal from 'vue-js-modal'
import VTooltip from 'v-tooltip'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'

Vue.use(Vuesax)

import VueTour from 'vue-tour'
import 'vue-tour/dist/vue-tour.css'
Vue.use(VueTour)

// Layouts
import DefaultLayout from './layouts/Default'
import LayoutHome from './layouts/Home'

Vue.component('DefaultLayout', DefaultLayout)
Vue.component('LayoutHome', LayoutHome)


import './ml';

Vue.use(VueGtag, {
  config: { id: "UA-161392946-1" }
}, router);

Vue.use(VTooltip)
Vue.use(VueCookies)
Vue.use(Vuex);
//Vue.use(VueReCaptcha, { siteKey: '6LfhneIUAAAAAD5iy7oduG0ni8-1ex59VGmxrHP6' })
Vue.use(Notifications)
Vue.use(VModal, { dialog: true })

const store = new Vuex.Store(Store);
sync(store, router);


Vue.config.productionTip = false

import App from './App.vue'


 new Vue({
   router,
   store,
   render: h => h(App)
 }).$mount('#app')
