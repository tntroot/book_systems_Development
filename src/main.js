

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue';
import  { mapActions }  from 'pinia';
import defineStore from './store/store';
import { createPinia } from "pinia";
import axios from 'axios';

import "bootstrap"; // 從nodeModule中載入Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Import css file

import './assets/main.css'

const app = createApp(App)


  
  router.beforeEach((to,from,next)=>{
    if(to.meta.headerLogin){
      axios.get("http://localhost:8080/book_systems/getBalance",{withCredentials:true})
      .then( res => res.data )
      .then( data =>{
        if(data.code === "200"){
            defineStore().setISLogin(true,data.userShows.account);
            next();
        }else{
            defineStore().setISLogin(false,"");
            next();
        }
      })
    }else{
      next();
    }
  })

  router.beforeEach((to,from,next)=>{
    if(to.meta.requiresAuth){
      axios.get("http://localhost:8080/book_systems/getBalance",{withCredentials:true})
      .then( res => res.data )
      .then( data =>{
        if(data.code === "200"){
          next();
        }else{
          alert("請先登入");
          next("/login")
        }
      })
    }else{
      next();
    }
  })

const pinia = createPinia();

app.use(router)

app.component('Icon',Icon)

app.use(pinia)

app.mount('#app')
