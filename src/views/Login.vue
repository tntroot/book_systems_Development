<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'
import Identify from '../components/Identify.vue'
export default {
    components:{
        RouterView,RouterLink,Identify,
    },
    data() {
        return {
            user:{
                account:"",
                pwd:"",
                passwork_eye:true,

                // 图片验证码
                identifyCode: '',
                // 验证码规则
                identifyCodes: '123456789ABCDEFGHGKMNPQRSTUVWXYZqwertyuioplkjhgfdsazxcvbnm',
                // 輸入的驗證碼
                inputIdentifyCode:''
            }
        }
    },
    methods:{
        login(){
            if(this.user.inputIdentifyCode !== this.user.identifyCode){
                alert('驗證碼輸入錯誤');
                return;
            }
            axios.post("http://localhost:8080/book_systems/login",this.user,{withCredentials:true})
            .then( data =>{
                const thisData = data.data;
                console.log(thisData);

                if(thisData.code==="200"){
                    this.$router.push("/setting");
                }else{
                    alert(thisData.message)
                }
            })
        },

        replaceCode(){
            this.user.identifyCode = "";
            this.makeCode(this.user.identifyCodes,4);
        },

        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.user.identifyCode += this.user.identifyCodes[
                    Math.floor(Math.random() * (o.length - 0) + 0)
                ]
            }
        },
    },
    mounted(){
        this.replaceCode();
    }
}
</script>
<template>
    <div class="login">
        <form class="bg-[#bcbcbc] w-fix p-6 rounded-xl font-bold flex flex-col" @submit.prevent="login">
            <div>
                <Icon icon="emojione:books" width="100" class="mx-auto" />
                <h1 class="text-3xl py-6 text-center">圖書管理系統</h1>
            </div>
            <div class="mb-4">
                <label for="Account" class="block text-xl">帳號</label>
                <input id="Account" type="text" placeholder="帳號 / 人員編號" class="py-3 pl-6 rounded-lg w-[25rem] pr-20" v-model="user.account" required>
            </div>
            <div class="mb-4">
                <label for="Passwork" class="block text-xl">密碼</label>
                <div class="relative">
                    <input id="Passwork" :type="user.passwork_eye ? 'password':'text'" placeholder="密碼" class="py-3 pl-6 rounded-lg w-[25rem] pr-20" required v-model="user.pwd" autocomplete="off">
                    <Icon :icon="user.passwork_eye ? 'mdi:eye-off':'mdi:eye'" class=" absolute right-3 text-3xl top-[50%] -translate-y-[50%] cursor-pointer active:scale-90 hover:scale-110" @click="user.passwork_eye = !user.passwork_eye" />
                </div>
            </div>
            <div class="mb-4">
                <label for="Passwork" class="block text-xl">驗證碼</label>
                <div class="flex items-center justify-between">
                    <input type="text" class="py-3 pl-6 rounded-lg w-[10rem] pr-20" placeholder="驗證碼" required v-model="user.inputIdentifyCode">
                    <Identify :identifyCode="user.identifyCode" />
                    <span @click="replaceCode" class=" underline decoration-1 text-blue-600 hover:text-red-600 hover:scale-110 active:scale-90 cursor-pointer">換一張</span>
                </div>
            </div>
            <div class="flex justify-between mb-6 text-xl">
                <RouterLink to="/sign" class="hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer text-xl">註冊</RouterLink>
                <RouterLink to="/forgetpasswork" class="hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer text-xl">忘記密碼</RouterLink>
            </div>
            <button type="submit" class="px-14 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95">
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