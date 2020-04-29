
import Vue from 'vue'
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';

import './registerServiceWorker'

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
import Movimento117 from './layouts/Movimento117'

Vue.component('DefaultLayout', DefaultLayout)
Vue.component('Movimento117', Movimento117)


import './ml';

Vue.use(VueGtag, {
  config: { id: "UA-161392946-1" }
}, router);

Vue.use(VTooltip)
Vue.use(VueCookies)
Vue.use(Vuex);
Vue.use(VueReCaptcha, { siteKey: '6LfhneIUAAAAAD5iy7oduG0ni8-1ex59VGmxrHP6' })
Vue.use(Notifications)
Vue.use(VModal, { dialog: true })

const store = new Vuex.Store(Store);
sync(store, router);


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.config.productionTip = false

import App from './App.vue'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 new Vue({
   router,
   store,
   render: h => h(App)
 }).$mount('#app')
