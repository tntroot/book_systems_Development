<script>

export default {
    data() {
        return {
            Account: "",
            born:null,    // 生日
            email:"",   
            name:"",
            passwork:"",
            redate:"" ,   // 註冊日期

            minYear: "",   // 設定最大/最小生日
            maxYear:"",

            avatar:"../../../public/people.png"
        }
    },
    methods:{
        seetting(){
            const Account_data=JSON.parse(localStorage.getItem('a@gmail.com'));
            const thisdate=new Date();  // 現在時間

            this.Account=Account_data.account;
            this.name=Account_data.name;
            this.email=Account_data.email;
            this.born=Account_data.born;
            this.passwork=Account_data.passwork;

            this.minYear=eval(thisdate.getFullYear()+"-100")+"-01-01";
            this.maxYear=thisdate.getFullYear() + "-" + (thisdate.getMonth()+1).toString().padStart(2,'0') + "-" + thisdate.getDate().toString().padStart(2,'0');

        },
        handleFile(e){
            const file=e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload=(e) =>{
                console.log(e.target.result);
                this.avatar=e.target.result;
            }
        }
    },
    mounted(){
        this.seetting();
        console.log(this.maxYear);
        
    }
    
}
</script>
<template>
    <form class=" border-2 border-gray-600 rounded-xl p-11 mx-auto my-12">
        <div class="head_img">
            <input type="file" id="f" accept="image/*" @change="handleFile" class="hiddenInput" style="display:none"/> 
            <img id="img" class="avatarImg" :src="this.avatar" onclick="f.click()">
            <!-- <p class="text_area">上傳頭像</p> -->
        </div>
        <div class="flex mb-3">
            <div class="mx-6">
                <label for="Account" class="block text-xl text-bold">帳號 / 人員編號</label>
                <input id="Account" type="text" class="p-2 rounded-lg border-2 border-gray-300" v-model="Account" disabled>
            </div>
            <div class="mx-6">
                <label for="Name" class="block text-xl text-bold">姓名</label>
                <input id="Name" type="text" class="p-2 rounded-lg border-2 border-gray-300" v-model="name">
            </div>
        </div>
        <div class="flex mb-3">
            <div class="mx-6">
                <label for="Email" class="block text-xl text-bold">信箱</label>
                <input id="Email" type="email" class="p-2 rounded-lg border-2 border-gray-300" v-model="email" disabled>
                <div class="text-blue-600 hover:text-red-600 active:scale-95 cursor-pointer text-xl inline-block ml-3">修改</div>
            </div>
            <div class="mx-6">
                <label for="Born" class="block text-xl text-bold">出生年月日</label>
                <input id="Born" type="date" :min="minYear" :max="maxYear" class="p-2 rounded-lg border-2 border-gray-300" v-model="born">
            </div>
        </div>
        <div class="mx-6">
            <label for="pwd" class="block text-xl text-bold">密碼</label>
            <input id="pwd" type="password" class="p-2 rounded-lg border-2 border-gray-300" v-model="passwork" disabled autocomplete="off">
            <div class="text-blue-600 hover:text-red-600 active:scale-95 cursor-pointer text-xl inline-block ml-3">修改</div>
        </div>
        <button type="button" class="px-14 py-3 mt-6 text-white bg-gray-500 mx-auto rounded-xl text-xl font-bold block hover:scale-105 active:scale-95">儲存</button>
    </form>
</template>

<style lang="scss">
    .head_img{
        width: fit-content;
        margin: 1.5rem auto 3rem auto;
        border-radius: 9999px;
        cursor: pointer;
        position: relative;

        .avatarImg{
            width: 15rem;
            border-radius: 9999px;

            &::after{
                content: '上傳頭像';
                width: inherit;
                padding: 0.8rem 3rem;
                text-align: center;
                font-size: 1.5rem;
                background-color: rgb(117, 117, 117);
                color: white;
                font-weight: bolder;
                opacity: 0.9;
                bottom: 0;
            }
        }

        .text_area{
            position: absolute;
            width: 15rem;
            padding: 0.8rem 3rem;
            text-align: center;
            font-size: 1.5rem;
            background-color: rgb(117, 117, 117);
            color: white;
            font-weight: bolder;
            opacity: 0.9;
            bottom: 0;
        }
    }
    
</style>