<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components:{
        RouterView,RouterLink
    },
    data() {
        return {
            manager:this.$route.query.user_data.manager
        }
    },
    mounted(){
        
    }
}
</script>
<template>
    <div class="flex items-start">
        <div class="accordion min-w-fit bg-[#afafaf] h-screen sticky top-0" id="accordionExample">
            <!-- 通用 -->
            <RouterLink to="/setting" class="area">
                <div class="w-fit hover:scale-105 active:scale-95 mx-auto">
                    <i class="fa-regular fa-user mr-3" style="color: #ff0000;"></i>我的帳號
                </div>
            </RouterLink>

            <!-- 僅管理者使用 -->
            <div class="accordion-item" v-if="manager<=1">
                <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                        <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto space">
                            <Icon icon="mdi:account-group" color="red"  class="mr-3 w-[30px]" />人員資料
                        </div>
                    </button>
                </h2>
                <RouterLink to="/setting/staff" class=" hover:scale-105 active:scale-95" v-if="manager===0">
                    <div id="collapseThree" class="accordion show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">                 
                        <div class="accordion-body">
                            <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto hover:text-red-600">
                                <i class="fa-solid fa-user-tie mr-3 text-red-600"></i>員工
                            </div>                           
                        </div>
                    </div>
                </RouterLink>
                <RouterLink to="/setting/client" class=" hover:scale-105 active:scale-95" v-if="manager<=1">
                    <div id="collapseThree" class="accordion show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">                 
                        <div class="accordion-body">
                            <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto hover:text-red-600">
                                <Icon icon="grommet-icons:user-manager" color="red" class="mr-3 w-[30px]"/>客戶
                            </div>                          
                        </div>
                    </div>
                </RouterLink>
            </div> 

            <!-- 通用 -->
            <RouterLink to="/setting/shopping" class="area">
                <div class="w-fit hover:scale-105 active:scale-95 mx-auto">
                    <i class="fa-solid fa-cart-arrow-down mr-3" style="color: #ff0000;"></i>購物清單
                </div>
            </RouterLink>

            <!-- 僅員工使用 -->
            <div class="accordion-item" v-if="manager<=1">
                <h2 class="accordion-header" id="headingFour">
                    <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                        <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto space">
                            <Icon icon="fluent-mdl2:account-management" width="30" class="mr-3  font-bold text-red-600"/>帳務管理
                        </div>
                    </button>
                </h2>
                <RouterLink to="/setting/purchase" class=" hover:scale-105 active:scale-95">
                    <div id="collapseFour" class="accordion show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">                 
                        <div class="accordion-body">
                            <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto hover:text-red-600">
                                <Icon icon="arcticons:purchased-apps" color="red" class="mr-3"  width="30"/>進貨
                            </div>                           
                        </div>
                    </div>
                </RouterLink>
                <RouterLink to="/setting/sale" class=" hover:scale-105 active:scale-95">
                    <div id="collapseFour" class="accordion show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">                 
                        <div class="accordion-body">
                            <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto hover:text-red-600">
                                <Icon icon="ps:sale-tag" color="red" class="mr-3 w-[30px]"/>銷貨
                            </div>                          
                        </div>
                    </div>
                </RouterLink>
                <RouterLink to="/setting/stock" class=" hover:scale-105 active:scale-95">
                    <div id="collapseFour" class="accordion show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">                 
                        <div class="accordion-body">
                            <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto hover:text-red-600">
                                <Icon icon="ic:baseline-inventory" color="red" class="mr-3 w-[30px]"/>庫存
                            </div>                           
                        </div>
                    </div>
                </RouterLink>
                <RouterLink to="/setting/supplier" class=" hover:scale-105 active:scale-95">
                    <div id="collapseFour" class="accordion show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">                 
                        <div class="accordion-body">
                            <div class="flex w-fit hover:scale-105 active:scale-95 mx-auto hover:text-red-600">
                                <i class="fa-solid fa-truck-field-un mr-3" style="color: #ff0000;"></i>供應商
                            </div>                           
                        </div>
                    </div>
                </RouterLink>
            </div>   
        </div>
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>
    .area{
        display: block;
        padding: 1.5rem;
        text-align: center;
        font-size: 1.5rem;
        line-height: 2rem;
        color: white;
        font-weight: bolder;
        border-bottom: gray solid 2px;
        cursor: pointer;
    }
    .collapse {
        visibility: visible;
    }

    .accordion-header{
        font-size: 1.5rem;
        line-height: 2rem;
        background-color: #afafaf;

        .accordion-button{
            display: block;
            font-size: 1.5rem;
            line-height: 2rem;
            font-weight: bold;
            padding: 0;
            color: white;
            padding: 1.5rem 3.5rem;

            &::after{
                width: 0;
            }
            &:focus{
                background-color: #afafaf;
            }
        }
    }

    .accordion-item{
        --bs-accordion-active-bg: none;
    }

    .accordion-body{
        text-align: center;
        font-size: 1.5rem;
        line-height: 2rem;
        border-bottom: 1px gray solid;
    }
</style>