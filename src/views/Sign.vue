<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components:{
        RouterView,RouterLink
    },
    data() {
        return {
            redate:new Date(),
            name:"",
            bron:null,
            email:"",

            minYear: "",   // 設定最大/最小生日
            maxYear:"",

            account:"",
            passwork:"",repasswork:"",pa_repa:false,

            verify:true,   // 驗證
            verify_text:null,verify_TF:false,verify_num:null,

            verify_email:true

        }
    },
    methods:{
        bron1(){  // 設定出生
            const thisdate=new Date();  // 現在時間

            this.minYear=eval(thisdate.getFullYear()+"-100")+"-01-01";
            this.maxYear=thisdate.getFullYear() + "-" + (thisdate.getMonth()+1).toString().padStart(2,'0') + "-" + thisdate.getDate().toString().padStart(2,'0');
        },
        sign(){
            if(this.passwork!==this.repasswork){
                this.pa_repa=true;
            }else if(this.passwork===this.repasswork && this.repasswork!=="" && this.passwork!==""){
                this.pa_repa=false;
                this.verify=false;  // 叫出驗證頁面

                this.verify_num=Math.floor(Math.random()*999998)+1;
                console.log(this.verify_num);
                localStorage.setItem(this.email,JSON.stringify({
                    name:this.name,
                    born:this.bron,
                    email:this.email,
                    account:this.account,
                    passwork:this.passwork,
                    redate:this.redate.toISOString().split('T')[0],
                    verify:this.verify_num
                }));
            }
        },
        verify_check(){
            if(this.verify_text==="" || JSON.parse(localStorage.getItem(this.email)).verify!==this.verify_text){
                this.verify_TF=true;
            }else{
                this.verify_TF=false;
                this.verify_email=false;

                setTimeout(()=>{
                    this.$router.push('/login');
                },3000)
            }
        }
    },
    mounted(){
        this.bron1();
    }
}
</script>
<template>
    <form v-if="verify" action="" method="get" @submit="sign" class="w-fix mx-auto">
        <div class="bg-[#bcbcbc]  p-6 rounded-xl font-bold">
            <div class="mx-auto">
                <img src="../../public/book_header_icon.png" alt="book" width="100" class="mx-auto">
                <h1 class="text-3xl py-6 text-center">圖書管理系統</h1>
            </div>
            <div class="flex justify-evenly">
                <div class="mx-3">
                    <div class="mb-4">
                        <label for="Name" class="block text-xl">姓名</label>
                        <input id="Name" type="text"  class="p-3 rounded-lg w-[25rem]" required v-model="name">
                    </div>
                    <div class="mb-4">
                        <label for="Born" class="block text-xl">出生年月日</label>
                        <input id="Born" type="date" :min="minYear" :max="maxYear" class="p-3 rounded-lg w-[25rem]" v-model="bron">
                    </div>
                    <div class="mb-4">
                        <label for="Email" class="block text-xl">Email</label>
                        <input id="Email" type="email" placeholder="Email" class="p-3 rounded-lg w-[25rem]" required v-model="email">
                    </div>
                    <div class="mb-4">
                        <label for="Registration" class="block text-xl">註冊時間</label>
                        <input id="Registration" type="date" class="p-3 rounded-lg w-[25rem]" :value="redate.toISOString().split('T')[0]" disabled>
                    </div>
                </div>
                
                <div class="mx-3">
                    <div class="mb-4">
                        <label for="Account" class="block text-xl">帳號</label>
                        <input id="Account" type="text" class="p-3 rounded-lg w-[25rem]" required v-model="account">
                    </div>
                    <div class="mb-4">
                        <label for="Passwork" class="block text-xl">密碼</label>
                        <input id="Passwork" type="password" placeholder="密碼" class="p-3 rounded-lg w-[25rem]" required v-model="passwork">
                    </div>
                    <div class="mb-4">
                        <label for="RePasswork" class="block text-xl">確認密碼</label>
                        <input id="RePasswork" type="password" placeholder="密碼" class="p-3 rounded-lg w-[25rem]" required v-model="repasswork">
                        <p v-if="pa_repa" class="text-red-600 text-xl">密碼與確認密碼不一致</p>
                    </div>
                </div>
            </div>
            
            <button type="sumbit" class="px-14 my-3 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95">註冊</button>
        </div>   
    </form>

    <div v-else class="w-fix mx-auto flex flex-col items-center ">
        <div class="mx-auto ">
            <img src="../../public/book_header_icon.png" alt="book" width="100" class="mx-auto">
            <h1 class="text-3xl py-6 text-center">圖書管理系統</h1>
        </div>
        <div v-if="verify_email">
            <p class="my-6 text-xl">已將驗證碼發送到你的郵件，請確認你信箱中的驗證碼</p>
            <div class="mb-4">
                <label for="Account" class="block text-xl">驗證碼</label>
                <input id="Account" type="number" class="p-3 rounded-lg w-full border-2 border-black" required v-model="verify_text">
                <p v-if="verify_TF" class="text-red-600 text-xl">驗證碼輸入錯誤</p>
            </div>
            <button type="button" class="px-14 my-3 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95" @click="verify_check">確認</button>
        </div>
        <div v-else class="flex items-center flex-col">
            <p class="my-6 text-xl">註冊成功</p>
        </div>   
    </div>

</template>

<style lang="scss">
    
</style>