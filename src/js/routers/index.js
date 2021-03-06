import Vue from 'vue'
import Router from 'vue-router'
import VueBodyClass from 'vue-body-class';


Vue.use(Router)

import Home from '@views/Home'
import Map from '@views/Map'
import About from '@views/About'
import StaySafe from '@views/StaySafe'
import Store from '@views/Store'
import List from '@views/List'
import Item from '@views/Item'
import Login from '@views/Login'

const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { bodyClass: 'dashboard', layout: 'LayoutHome'  }
  },
  {
    path: '/fique-seguro',
    component : StaySafe,
    name: 'seguranca',
    meta: { bodyClass: 'staysafe'  }
  },
  {
    path: '/sobre',
    component : About,
    name: 'sobre',
    meta: { bodyClass: 'about'  }
  },
  {
    path: '/novo-produtor',
    component : Store,
    name: 'store',
    meta: { bodyClass: 'small_business hidden-bottombar'  }
  },
  {
    path: '/lista/:type',
    component : List,
    name: 'List',
    props: true,
    meta: { bodyClass: 'list'  }
  },
  {
    path: '/mapa',
    name: 'home_map',
    component: Map,
    meta: { bodyClass: 'dashboard' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { bodyClass: 'dashboard login' },
  },
  {
    path: '/:slug',
    name: 'single_item',
    component: Item,
    props: true,
    meta: { bodyClass: 'dashboard map-item' }
  },
]

// import Movimento from './movimento'
//
const routes = baseRoutes.concat(
  //Movimento
)

const router = new Router({
  mode: 'history',
  routes: routes
})

const vueBodyClass = new VueBodyClass(routes);

router.beforeEach((to, from, next) => { vueBodyClass.guard(to, next) });

export default router;
