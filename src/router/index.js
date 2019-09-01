import Vue from 'vue'
import store from '@/store/index.js'
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

import Router from 'vue-router'
import internal from '@/components/internal/internal.vue'
import Login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'

import addDoctor from '@/components/doctor/addDoctor.vue';
import editDoctor from '@/components/doctor/editDoctor.vue';
import addShift from '@/components/doctor/addShift.vue';
import shiftDoctor from '@/components/doctor/shiftDoctor.vue';
import addPatient from '@/components/patient/addPatient.vue';
import patientInfo from '@/components/patient/patientInfo.vue';
import Guahao from '@/components/registers/Guahao.vue';
import Guanli from '@/components/registers/Guanli.vue';
import Jiaofei from '@/components/registers/Jiaofei.vue';
import Chakan from '@/components/drug/Chakan.vue';
import Chuyao from '@/components/drug/Chuyao.vue';
import Buyao from '@/components/drug/Buyao.vue';

Vue.use(Router);
Vue.use(VueResource);




const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login

    },

    {
      path: '/internal',
      name: 'internal',
      component: internal,
      children:[
        {
          path: '/home',
          name: 'home',
          component: home 
        },
        {
          path: '/addDoctor',
          name: 'addDoctor',
          component: addDoctor 
        },
        {
          path: '/editDoctor',
          name: 'editDoctor',
          component: editDoctor 
          // component:()=>import('./components/doctor/editDoctor.vue')
        },
        {
          path: '/addShift',
          name: 'addShift',
          component:addShift 
        },
        {
          path: '/shiftDoctor',
          name: 'shiftDoctor',
          component: shiftDoctor 
        },
        {
          path: '/addPatient',
          name: 'addPatient',
          component: addPatient 
        },
        {
          path: '/patientInfo',
          name: 'patientInfo',
          component: patientInfo 
      
        },
        {
          path: '/Guahao',
          name: 'Guahao',
          component:Guahao
      
        },
        {
          path: '/Guanli',
          name: 'Guanli',
          component: Guanli 
      
        },
        {
          path: '/Jiaofei',
          name: 'Jiaofei',
          component: Jiaofei 
      
        },
        {
          path: '/Chakan',
          name: 'Chakan',
          component: Chakan 
      
        },
        {
          path: '/Chuyao',
          name: 'Chuyao',
          component: Chuyao 
      
        },
        {
          path: '/Buyao',
          name: 'Buyao',
          component: Buyao 
      
        },
        {path: '*', redirect: '/home'}
      ] 
    },
    {path: '*', redirect: '/login'}
  ]
});

// //注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   //获取store里面的token
//   let token = store.state.token;
//   //判断要去的路由有没有requiresAuth
//   if(to.meta.requiresAuth){
//     if(token){
//       next();
//     }else{
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       });
//     }
//   }else{
//     next();//如果无需token,那么随它去吧
//   }
// });

export default router;
