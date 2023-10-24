<script>
import axios from 'axios';

export default {
    data() {
        return {
            ckeckEmail:true,  //找回密碼

            vey:null,
            email:"",
            find_email:"",  // 檢查帳號是否存在

            verify_email:true,  // 油箱驗證碼
            verify_TF:"",    // 認證油箱碼
            verify_text:null,

            post_paasswork:false  // 修改密碼介面
        }
    },
    methods:{
        vey1(){
            axios.post("http://localhost:8080/book_systems/forgetPwd",{
                "email":this.email
            },
            {withCredentials:true})
            .then(res => res.data)
            .then(data => {
                if(data.code !== "200"){
                    this.find_email = data.message;
                }else{
                    this.find_email="";
                    this.ckeckEmail=false;
                }
            })
            .catch(err =>{
                console.log(err);
            })
        },
        verify_check(){

            if(!this.verify_text){
                this.verify_TF="驗證碼輸入錯誤";
                return;
            }

            axios.post("http://localhost:8080/book_systems/forget/check_pwd_token",{
                "token":this.verify_text
            },
            {withCredentials:true})
            .then(res => res.data)
            .then(data => {

                if(data.code === "200"){
                    this.verify_TF="";
                    this.$router.push("/forgeteditnewpwd");
                }else{
                    this.verify_TF=data.message;
                }
            })
        }
    }
}
</script>
<template>
    <form v-if="ckeckEmail" action="" method="get" onsubmit="return false"  class="w-fix flex flex-col items-center my-20">
        <div class="mx-auto mb-4">
            <Icon icon="emojione:shopping-bags" width="100" class="mx-auto" />
            <h1 class="text-3xl py-6 text-center">書海經</h1>
        </div> 
        <div class="mb-4">
            <label for="Email" class="block text-xl">請輸入你的 Email</label>
            <input id="Email" type="email" placeholder="Email" class="p-3 rounded-lg w-[25rem] border-2 border-black" required v-model="email">
            <p v-if="find_email" class="text-red-600 text-xl">{{ find_email }}</p>
        </div>
        <button type="sumbit" class="px-14 my-3 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95" @click="vey1">確認</button>
    </form>

    <div v-else class="w-fix mx-auto flex flex-col items-center my-20">
        <div class="mx-auto mb-4">
            <Icon icon="emojione:shopping-bags" width="100" class="mx-auto" />
            <h1 class="text-3xl py-6 text-center">書海經</h1>
        </div> 
        <div v-if="verify_email">
            <p class="my-6 text-xl">已將驗證碼發送到你的郵件，請確認你信箱中的驗證碼</p>
            <div class="mb-4">
                <label for="Account" class="block text-xl">驗證碼</label>
                <input id="Account" type="text" class="p-3 rounded-lg w-full border-2 border-black" required v-model="verify_text">
                <p v-if="verify_TF" class="text-red-600 text-xl">{{ verify_TF }}</p>
            </div>
            <button type="button" class="px-14 my-3 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95" @click="verify_check">確認</button>
        </div>

        <div v-if="post_paasswork" class="flex items-center flex-col">
            <p class="my-6 text-xl">修改</p>
        </div>  
    </div>

</template>

<style>
    
</style>