<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';
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

            passwork_eye:true,repasswork_eye:true,

            verify:true,   // 驗證

            /** * @param {text} verify_text 輸入產生的驗證碼 */
            verify_text:null,

            /** * @param {text} verify_TF 驗證碼輸入錯誤顯示的文字 */
            verify_TF:false,
            
            /** * @param {text} verify_num 隨機驗證碼  */
            verify_num:null,

            /** * @param {text} verify_email 是否註冊成功  */
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
                // this.pa_repa=false;
                // this.verify=false;  // 叫出驗證頁面

                // this.verify_num=Math.floor(Math.random()*999998)+1;
                // console.log(this.verify_num);
                // localStorage.setItem(this.email,JSON.stringify({
                //     name:this.name,
                //     born:this.bron,
                //     email:this.email,
                //     account:this.account,
                //     passwork:this.passwork,
                //     redate:this.redate.toISOString().split('T')[0],
                //     verify:this.verify_num
                // }));
                // event.preventDefault()
                axios.post("http://localhost:8080/book_systems/sign",{
                    account:this.account, 
                    user_name:this.name, 
                    email:this.email, 
                    pwd:this.passwork, 
                    born:this.bron, 
                    redate:this.redate
                },{withCredentials: true})
                .then( res =>{

                    const resData = res.data;
                    console.log(resData);

                    if(resData.code === "200"){
                        this.pa_repa=false;
                        this.verify=false;

                        setTimeout(()=>{
                            this.$router.push('/login');
                        },3000)
                    }else{
                        alert(resData.message);
                    }
                })
                .catch(err =>{
                    console.log(err);
                })
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
    <form v-if="verify" action="" method="get" @submit.prevent="sign()" class="w-fix mx-auto">
        <div class="bg-[#bcbcbc]  p-12 font-bold">
            <div class="mx-auto">
                <Icon icon="emojione:shopping-bags" width="100" class="mx-auto" />
                <h1 class="text-3xl py-6 text-center">書海經</h1>
            </div>
            <div class="flex justify-evenly">
                <div class="mx-3">
                    <div class="mb-4">
                        <label for="Name" class="block text-xl">姓名</label>
                        <input id="Name" type="text"  class="p-3 rounded-lg w-[25rem]" required v-model="name">
                    </div>
                    <div class="mb-4">
                        <label for="Born" class="block text-xl">出生年月日</label>
                        <!-- showPicker() -->
                        <input id="Born" type="date" :min="minYear" :max="maxYear" class="p-3 rounded-lg w-[25rem]"  v-model="bron" required>
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
                        <div class="relative">
                            <input id="Passwork" :type="passwork_eye ? 'password':'text'" placeholder="密碼" class="py-3 pl-6 rounded-lg w-[25rem] pr-20" required v-model="passwork" autocomplete="off">
                            <Icon :icon="passwork_eye ? 'mdi:eye-off':'mdi:eye'" class=" absolute right-3 text-3xl top-[50%] -translate-y-[50%] cursor-pointer active:scale-90 hover:scale-110" @click="passwork_eye = !passwork_eye" />
                        </div>
                        
                        <p class="text-red-600 text-xl">(請輸入 8~16位密碼，</p>
                        <p class="text-red-600 text-xl">並包含 小寫字母、大寫字母、數字 各一個)</p>
                    </div>
                    <div class="mb-4">
                        <label for="RePasswork" class="block text-xl">確認密碼</label>
                        <div class=" relative">
                            <input id="RePasswork" :type="repasswork_eye ? 'password':'text'" placeholder="密碼" class="py-3 pl-6 rounded-lg w-[25rem] pr-20" required v-model="repasswork" autocomplete="off">
                            <Icon :icon="repasswork_eye ? 'mdi:eye-off':'mdi:eye'" class=" absolute right-3 text-3xl top-[50%] -translate-y-[50%] cursor-pointer active:scale-90 hover:scale-110" @click="repasswork_eye = !repasswork_eye" />
                        </div>
                        <p v-if="pa_repa" class="text-red-600 text-xl">密碼與確認密碼不一致</p>
                    </div>
                </div>
            </div>
            
            <button type="sumbit" class="px-14 my-3 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95">註冊</button>
        </div>   
    </form>

    <div v-else class="w-fix mx-auto flex flex-col items-center mt-12">
        <div class="mx-auto ">
            <Icon icon="emojione:shopping-bags" width="100" class="mx-auto" />
            <h1 class="text-3xl py-6 text-center">書海經</h1>
        </div>
        <!-- <div v-if="verify_email">
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
        </div>    -->

        <div v-if="verify_email" class="flex items-center flex-col">
            <p class="my-6 text-xl">註冊成功</p>
        </div>
    </div>

</template>

<style lang="scss" scoped>

</style>