<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'
export default {
    components:{
        RouterView,RouterLink
    },
    data() {
        return {
            user:{
                account:"",
                pwd:""
            }
        }
    },
    methods:{
        login(){
            axios.post("http://localhost:8080/book_systems/login",this.user,{withCredentials:true})
            .then( data =>{
                const thisData = data.data;
                console.log(thisData);

                if(thisData.code==="200"){
                    this.$router.push("/setting/staff")
                }else{
                    alert(thisData.message)
                }
            })
        }
    }
}
</script>
<template>
    <div class="login">
        <form class="bg-[#bcbcbc] w-fix p-6 rounded-xl font-bold flex flex-col">
            <div>
                <Icon icon="emojione:books" width="100" class="mx-auto" />
                <h1 class="text-3xl py-6 text-center">圖書管理系統</h1>
            </div>
            <div class="mb-4">
                <label for="Account" class="block text-xl">帳號</label>
                <input id="Account" type="text" placeholder="帳號 / 人員編號" class="p-3 rounded-lg w-[25rem]" v-model="user.account">
            </div>
            <div class="mb-2">
                <label for="Passwork" class="block text-xl">密碼</label>
                <input id="Passwork" type="password" placeholder="密碼" class="p-3 rounded-lg w-[25rem]" autocomplete="off" v-model="user.pwd">
            </div>
            <div class="flex justify-between my-3">
                <RouterLink to="/sign" class="hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">註冊</RouterLink>
                <RouterLink to="/forgetpasswork" class="hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">忘記密碼</RouterLink>
            </div>
            <button type="button" class="px-14 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95" @click="login">
                登入
            </button>   
        </form>    
    </div>
</template>

<style lang="scss" scoped>
    .login{
        height: 90vh;
        background-image: url('../../public/book.jpg');
        background-size:cover;
        background-position: center center;
        background-repeat: no-repeat;
        padding: 0 10rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>