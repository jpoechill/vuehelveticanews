// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import DotdotLoader from './mixins/dotdot-loader.js'
import moment from "moment";
import VueMomentJS from "vue-momentjs";

// // explicit installation required in module environments
Vue.use(VueFire)
Vue.use(DotdotLoader)
Vue.use(VueMomentJS, moment);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
