// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import './assets/iconfont/iconfont.css'
// import Blob from 'vendor/Blob.js'
// import Export2Excel from 'vendor/Export2Excel.js'
import  VueResource  from 'vue-resource'

Vue.use(VueResource)
require ('./assets/iconfont/iconfont.js')



Vue.use(ElementUI) //使用elementUI


Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
//检测是否登录，路由拦截
router.beforeEach((to, from, next) => {
  console.log(to, from, to.path);
  if (to.path !== '/login' && !sessionStorage.getItem('easeHis')) {
    this.$router.push({path: 'login'});
  } else if (to.path !== '/internal') {
    next();
  } else {
    this.$router.push({path: 'home'});
  }
});
