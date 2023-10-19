<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import  { mapActions,mapState }  from 'pinia';
import defineStore from '../store/store';
export default {
    components:{
        RouterView,RouterLink
    },
    data() {
        return {
            // account:defineStore().getIsLogin()[1]
        }
    },
    computed:{...mapState(defineStore,['account'])},
    methods:{

        ...mapActions(defineStore,["getIsLogin"]),

        getLogin(){
            axios.get("http://localhost:8080/book_systems/getBalance",{withCredentials:true})
            .then( res => res.data )
            .then( data =>{
                if(data.code === "200"){
                    this.account = data.userShows.account;
                }else{
                    this.account = "";
                }
            })
        },
    },
    updated(){
        
        // console.log(this.getIsLogin()[0])
        // this.account = this.getIsLogin()[1];

    }
}
</script>
<template>
    <header class="bg-[gray] p-6 flex justify-evenly items-center">
        <RouterLink to="/" class="flex items-center hover:scale-105 active:scale-95 cursor-pointer">
            <Icon icon="emojione:books" width="50" class="mx-auto" />
            <h1 class="text-3xl mx-6 font-bold">圖書管理系統</h1>
        </RouterLink>
        <div class=" w-fit relative">
            <input class="pr-14 text-xl p-3 rounded-full w-[25rem]" type="text">
            <RouterLink to="/search" >
                <Icon icon="flat-color-icons:search" width="35" class=" cursor-pointer absolute top-3 right-4 hover:scale-105 active:scale-95"/>
            </RouterLink>        
        </div>
        <div class="flex items-center">
            <img src="/people.png" alt="people" width="50">
            <div v-if="account===''" class="flex items-center text-3xl font-bold mx-6 tracking-[.3em]">
                <RouterLink to="/login" class=" hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">登入</RouterLink>
                <p>/</p>
                <RouterLink to="/sign" class="hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">註冊</RouterLink>
            </div>
            <div v-else class=" relative group">
                <p>{{ "Hi !" + account }}</p>
                <div class=" fixed scale-0 group-hover:scale-100">
                    <ul>
                        <li class="p-6 hover:bg-[#9d9d9d] text-xl">我的帳戶</li>
                        <li class="p-6 hover:bg-[#9d9d9d] text-xl">購買紀錄</li>
                        <li class="p-6 hover:bg-[#9d9d9d] text-xl">登出</li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
    
</style>