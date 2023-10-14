<script>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView from './components/Header.vue';
import TopView from './components/Top.vue';
export default{
  components:{
    HeaderView,RouterView,TopView
  },
  data() {
    return {
      elTop: 0, // 滾動前,捲軸距離視窗頂部的距離
      isShow: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scrolling)
    // 資料掛載完, window去監聽scroll事件
  },

  methods: {
      // 要滑到top為0的位置, 使用smooth的模式
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
      
    scrolling () {
      // 捲軸距離視窗頂部的距離
      const scrolltoTop = window.scrollY

      // 捲軸滾動的距離
      const scrollLength = scrolltoTop - this.elTop

      // 更新: 滾動前,捲軸距離視窗頂部的距離
      this.elTop = scrolltoTop

      // 判斷想要什麼高度讓按鈕出現
      if (scrollLength < 0 && this.elTop < 200) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>

<template>
  <HeaderView />
  <div>
    <RouterView />
  </div>
  <div class=" fixed bottom-[2rem] right-[2rem]">
    <TopView v-if="isShow" @click="scrollTop" class=" hover:scale-105 active:scale-95" />
  </div>
</template>

<style>

</style>
