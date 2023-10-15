<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components:{
        RouterView,RouterLink
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
            <div class="flex items-center text-3xl font-bold mx-6 tracking-[.3em]">
                <RouterLink to="/login" class=" hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">登入</RouterLink>
                <p>/</p>
                <RouterLink to="/sign" class="hover:scale-105 active:scale-95 hover:text-red-600 cursor-pointer">註冊</RouterLink>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
    
</style>