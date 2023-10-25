<script>
export default {
    props:["text","message","icon","icon_style"],
    data() {
        return {
            /**
             * @param {string} text 修改成功/修改失敗
             * @param {string} meesage 訊息
             * @param {string} icon icon
             * @param {string} icon_style icon 樣式
             */
             editStatus:{
                text:this.text,
                message:this.message,
                icon:this.icon,
                icon_style:this.icon_style
            },
        }
    },
    methods:{
        bgc(){
            this.$emit("bgc",false);
        }
    }
}
</script>
<template>
    <!-- 修改成功 -->
    <div class="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border py-6 px-32 rounded-2xl z-10">
        <h1 class="text-center text-3xl font-bold my-3">{{ editStatus.text }}</h1>
        <p class="text-center text-3xl my-3 text-[red]">{{ editStatus.message }}</p>
        <Icon :icon="editStatus.icon" :class="'my-6 mx-auto '+ editStatus.icon_style" width="120" />
        <button v-if="editStatus.text==='修改失敗' || editStatus.text==='新增失敗'" type="button" class="block mx-auto my-3 py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="bgc">確定</button>
    </div>
</template>

<style lang="scss" scoped>
    
</style>