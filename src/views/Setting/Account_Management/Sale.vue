<script>
export default {
    data() {
        return {
            sale_minY:new Date(),
            text:"", // 年
            text2:"1", // 月
            sale_AllY:[1999],
            saleTF:false,  // 年
            saleTF2:false,  // 月

            text3:"",         // 廠商
            saleTF3:false,
            sale_AllSupplier:[]
        }
    },
    methods:{
        sale_time(){
            for(let i=this.sale_AllY[0]+1;i<=parseInt(this.sale_minY.getFullYear());i++){
                this.sale_AllY.push(i);
            }
            this.text=this.sale_minY.getFullYear();

            this.sale_AllSupplier=['依太','二太','三太','四太','五太','六太','七太','八太','九太','十太'];
            this.text3=this.sale_AllSupplier[0];

        },

        thisY(index1){
            this.text=index1;
            this.saleTF=false;
        },
        thisY2(index2){
            this.text2=index2;
            this.saleTF2=false;
        },

        thisSupplier(index3){
            this.text3=index3;
            this.saleTF3=false;
        }
    },
    mounted(){
        this.sale_time();
    }
}
</script>
<template>
    <div class="w-full h-fit">
        <div class="accordion " id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">                
                        <Icon icon="ant-design:bars-outlined" class="mr-3 w-[30px] text-white text-3xl"/>     
                        <span class="text-white font-bold text-2xl">銷貨查詢</span> 
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="flex mb-6 flex-wrap">
                            <div class="mr-14">
                                <label for="sale">銷售日期區間</label>
                                <div class="flex items-center">
                                    <input id="sale" class="search" type="date">
                                    <p>　~　</p>
                                    <input id="sale" class="search" type="date">
                                </div>
                            </div>
                            <div class="mr-14">
                                <p>指定年月份</p>
                                <div class="flex">
                                    <div class=" relative flex items-center">
                                        <div class="search p-2 px-3 text-center cursor-pointer" @click="saleTF=!saleTF">{{ text }}</div>
                                        <div v-if="saleTF" class="search search_select">
                                            <p v-for="(item) in sale_AllY"  @click="thisY(item)">{{ item }}</p>
                                        </div>
                                        <p class="ml-3 text-xl font-bold">年</p>
                                    </div>
                                    <div class=" relative flex items-center ml-3">
                                        <div class="search p-2 px-3 text-center cursor-pointer" @click="saleTF2=!saleTF2">{{ text2 }}</div>
                                        <div v-if="saleTF2" class="search search_select">
                                            <p v-for="(item) in [1,2,3,4,5,6,7,8,9,10,11,12]" class="px-[0.5rem]"  @click="thisY2(item)">{{ item }}</p>
                                        </div>
                                        <p class="ml-3 text-xl font-bold">月</p>
                                    </div>
                                </div>                         
                            </div>
                            <div class="mr-14">
                                <p>廠商</p>
                                <div class=" relative flex items-center">
                                    <div class="search p-2 px-3 text-center cursor-pointer" @click="saleTF3=!saleTF3">{{ text3 }}</div>
                                    <div v-if="saleTF3" class="search search_select">
                                        <p v-for="(item) in sale_AllSupplier"  @click="thisSupplier(item)">{{ item }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end">
                            <button type="button" class="innsert_search_btn bg-[blue]">查詢</button>
                        </div>
                                            
                    </div>
                </div>
            </div>
        </div>
        <div class="m-6 mb-36">
            <table class="w-full table_search">
                <thead class="bg-[#bfbfff]">
                    <tr class="text-center ">
                        <th class="py-3">流水號</th>
                        <th>進貨廠商名稱</th>
                        <th>ISBN</th>
                        <th>書名</th>
                        <th>銷售金額</th>
                        <th>銷售量</th>
                        <th>銷售日期</th>
                        <th>單品項的總銷售金額</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in Math.floor(Math.random()*10+1)" class="text-center ">
                        <td class="py-3">{{ item }}</td>
                        <td>依太</td>
                        <td>9456123785462</td>
                        <td>客家獅</td>
                        <td>30</td>
                        <td>100</td>
                        <td>2023/08/03</td>
                        <td>3000</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="bg-[#bfbfff]">
                        <td colspan="8" class="py-3 pr-14">
                            <div class="flex justify-end ">
                                <input type="button" class="p-1  text-3xl font-bold hover:text-red-600 hover:scale-110 active:scale-90" value="<  ">
                                <p class="p-1  text-3xl font-bold ">1</p>
                                <input type="button" class="p-1  text-3xl font-bold hover:text-red-600 hover:scale-110 active:scale-90" value="  >">
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-[#bfbfff] text-center text-2xl">
                        <th colspan="6" class="py-3 pr-14">所有品項的總銷售金額</th>
                        <th colspan="2" class="py-3 ">30000</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    
   
</template>

<style lang="scss" scoped>
    .collapse {
        visibility: visible;
    }
    .accordion-item{
        --bs-accordion-active-bg: none;
        border-radius: 0;

        .accordion-header{
            background-color: #3cb9e9;
        }
        .accordion-body{
            div{
                .search{
                    border: 2px solid gray;
                    padding: 0.25rem;
                    border-radius: 0.5rem;
                    display: block;
                    outline: none;

                    &::-webkit-inner-spin-button,&::-webkit-outer-spin-button{
                        appearance: none;
                    }
                }

                .search_select{
                    position: absolute;
                    top: 2.5rem;
                    left: 0;
                    max-height: 160px;
                    overflow: auto;
                    background-color: white;
                    padding: 0;
                    cursor: pointer;

                    &::-webkit-scrollbar {
                        width: 7px;
                    }
                    &::-webkit-scrollbar-thumb {
                        border-radius: 4px;
                        background-color: rgb(124, 124, 124);
                        border: 1px solid #000;
                    }
                    
                    p{
                        padding: 0.5rem 0.75rem;
                        text-align: center;

                        &:hover{
                            background-color: rgb(0, 149, 255);
                            color: white;
                        } 
                    }

                    
                }
            }

            .innsert_search_btn{
                padding: 0.5rem 2rem;
                border-radius: 0.75rem;
                color: white;
                margin-right: 1.5rem;
                font-size: 1.25rem;
                line-height: 1.75rem;
                font-weight: bold;

                &:hover{
                    scale: 1.05;
                }
                &:active{
                    scale: 0.95;
                }
            }
            
        }
    }

    .table_search{
        td{
            border: 2px #939292 solid;

            .revise{
                padding: 0.5rem 1rem;
                border-radius: 0.75rem;
                color: white;
                font-size: 1rem;
                line-height: 1.5rem;
                font-weight: bold;
                background-color: blue;
                margin: 0;

                &:hover{
                    scale: 1.05;
                }
                &:active{
                    scale: 0.95;
                }
            }
        }
        th{
            border: 2px #939292 solid;
        }
    }

</style>