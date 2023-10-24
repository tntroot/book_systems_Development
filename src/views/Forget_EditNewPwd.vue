<script>
import axios from 'axios';

export default {
    data() {
        return {
            newPwdPage: true,
            passwork_eye: true,
            repasswork_eye: true,
            newPwd: "",
            checkNewPwd: "",
            checkNewPwdError: ""
        };
    },
    methods: {
        vey() {
            if (this.newPwd === this.checkNewPwd) {
                axios.post("http://localhost:8080/book_systems/forget/replacePwd", {
                    newPwd: this.newPwd
                }, { withCredentials: true })
                    .then(res => res.data)
                    .then(data => {
                    if (data.code === "200") {
                        this.newPwdPage = false;
                        setTimeout(()=>{
                            this.$router.push("/login");
                        },"2000")
                    }
                    else {
                        this.newPwdPage = true;
                        this.checkNewPwdError = data.message;
                    }
                });
            }
        }
    },
}
</script>
<template>
    <form v-if="newPwdPage" action="" method="get" onsubmit="return false"  class="w-fix flex flex-col items-center my-20">
        <div class="mx-auto mb-4">
            <Icon icon="emojione:shopping-bags" width="100" class="mx-auto" />
            <h1 class="text-3xl py-6 text-center">書海經</h1>
        </div> 
        <div class="mb-4">
            <label for="Passwork" class="block text-xl">新密碼</label>
            <div class="relative">
                <input id="Passwork" :type="passwork_eye ? 'password':'text'" placeholder="請輸入新密碼" class="py-3 pl-6 rounded-lg w-[25rem] pr-20 border-2 border-[#9a9a9a]" required v-model="newPwd" autocomplete="off">
                <Icon :icon="passwork_eye ? 'mdi:eye-off':'mdi:eye'" class=" absolute right-3 text-3xl top-[50%] -translate-y-[50%] cursor-pointer active:scale-90 hover:scale-110" @click="passwork_eye = !passwork_eye" />
            </div>
            
            <p class="text-red-600 text-xl">(請輸入 8~16位密碼，</p>
            <p class="text-red-600 text-xl">並包含 小寫字母、大寫字母、數字 各一個)</p>
        </div>
        <div class="mb-4">
            <label for="RePasswork" class="block text-xl">確認密碼</label>
            <div class=" relative">
                <input id="RePasswork" :type="repasswork_eye ? 'password':'text'" placeholder="確認密碼" class="py-3 pl-6 rounded-lg w-[25rem] pr-20 border-2 border-[#9a9a9a]" required v-model="checkNewPwd" autocomplete="off">
                <Icon :icon="repasswork_eye ? 'mdi:eye-off':'mdi:eye'" class=" absolute right-3 text-3xl top-[50%] -translate-y-[50%] cursor-pointer active:scale-90 hover:scale-110" @click="repasswork_eye = !repasswork_eye" />
            </div>
            <p v-if="newPwd!==checkNewPwd && checkNewPwd" class="text-red-600 text-xl">密碼與確認密碼不一致</p>
        </div>
        <button type="sumbit" class="px-14 my-3 py-3 text-white bg-gray-500 mx-auto rounded-xl block hover:scale-105 active:scale-95" @click="vey">確認</button>
        <p class="text-red-600 text-3xl mt-6 font-bold">{{ checkNewPwdError }}</p>
    </form>
    <div v-else class="w-fix mx-auto flex flex-col items-center ">
        <div class="mx-auto mt-12">
            <Icon icon="emojione:shopping-bags" width="100" class="mx-auto" />
            <h1 class="text-3xl py-6 text-center">書海經</h1>
        </div>
        <div class="flex items-center flex-col">
            <p class="my-6 text-3xl">變更密碼成功</p>
            <Icon icon="icon-park-solid:check-one" class="my-6 mx-auto text-[green]" width="120" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
</style>