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

            // if(this.find_email === ""){
            //     progress.style = "display:block";
            //     let percent = 0;

            //     var id = setInterval(()=>{
            //         //let percent = Math.floor((ProgressEvent.loaded / ProgressEvent.total) * 100);
            //         percent ++ ;
            //         prog.setAttribute('aria-valuenow', percent);
            //         prog.setAttribute('style', 'width:' + percent + '%');
            //         val.innerText = percent + '%';

            //         if(percent === 100){
            //             clearInterval(id);

            //         }
            //     } ,10);
            // } 

            let progress = document.querySelector('#progress');
            let prog = document.querySelector('.progress-bar');
            let val = document.querySelector('#val');

            axios.post("http://localhost:8080/book_systems/forgetPwd",{
                "email":this.email
            })
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
                progress.style = "display:none"
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
        <!-- 進度條 -->
        <!-- <div class="text-3xl my-3 w-[25rem]">
            <p>Loading: </p>
            <progress max="100" value="0" class="w-full h-6 my-2 bg-[#1a6ec2] text-[#123456]"></progress>
            <p id="val" class=" text-center">0</p>
        </div> -->
        <div id="progress" class="w-[25rem] text-3xl my-3 hidden">
            <p>Loading: </p>
            <div class="progress my-3">
                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> 
            </div>
            <p id="val" class=" text-center">0</p>
        </div>
        
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