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
            
        }
    },
    computed:{...mapState(defineStore,['account','accountt'])},
    methods:{

        ...mapActions(defineStore,["getIsLogin"]),

        // getLogin(){
        //     axios.get("http://localhost:8080/book_systems/getBalance",{withCredentials:true})
        //     .then( res => res.data )
        //     .then( data =>{
        //         if(data.code === "200"){
        //             this.account = data.userShows.account;
        //         }else{
        //             this.account = "";
        //         }
        //     })
        // },

        logout(){
            axios.get("http://localhost:8080/book_systems/logout",{withCredentials:true})
            .then(res => res.data)
            .then(data =>{
                if(data.code === "200"){
                    alert("成功登出");
                    this.$router.push({
                        path:"/",
                        query:{
                            "":""
                        }
                    });
                }
            })
        },

        
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
            <input id="search" class="pr-14 text-xl p-3 rounded-full w-[25rem]" type="text">
            <RouterLink to="/search" >
                <Icon icon="flat-color-icons:search" width="35" class=" cursor-pointer absolute top-3 right-4 hover:scale-105 active:scale-95"/>
            </RouterLink>        
        </div>
        <div class="flex items-center" >
            <div v-if="account===''" class="flex items-center text-3xl font-bold mx-6 tracking-[.3em]">
                <RouterLink to="/login" class=" hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">登入</RouterLink>
                <p>/</p>
                <RouterLink to="/sign" class="hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">註冊</RouterLink>
            </div>
            <div v-else class=" relative group">
                <div class="flex items-center">
                    <img src="/people.png" alt="people" width="50">
                    <p class="mx-3 text-xl font-bold">{{ account }}</p>
                </div>
                <div class=" fixed scale-0 group-hover:scale-100 duration-300 origin-top-left z-50 setting pt-3">
                    <ul class="bg-[#ffffff] rounded-sm border border-[#b9b9b9] w-48 border-t-transparent">
                        <RouterLink to="/setting/" >
                            <li class="py-2 hover:bg-[#dddddd] text-sm pl-6 cursor-pointer hover:text-[#5885ff] font-bold">我的帳戶 </li>
                        </RouterLink>
                        <RouterLink to="/setting/shopping" >
                            <li class="py-2 hover:bg-[#dddddd] text-sm pl-6 cursor-pointer hover:text-[#5885ff] font-bold">購買紀錄 </li>
                        </RouterLink>
                        <li :key="$route.fullPath" class="py-2 hover:bg-[#dddddd] text-sm pl-6 cursor-pointer hover:text-[#5885ff] font-bold" @click="logout">登出</li>
                    </ul>
                </div>
            </div>
            
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .setting{
        &::after{
            content: "";
            position: absolute;
            width: 0;height: 0;
            border: 1rem solid;
            border-color: white transparent transparent transparent;
            transform: rotate(45deg);
            top: 0%;left: 25%;
            z-index: -1;
        }
    }
</style>