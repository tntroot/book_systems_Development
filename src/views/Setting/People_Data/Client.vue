<script>
export default {
    data() {
        return {
            thisdate: new Date(),
            maxDate:''
        }
    },
    methods:{
        getdate(){
            this.maxDate=this.thisdate.getFullYear()+'-'+(this.thisdate.getMonth()+1).toString().padStart(2,'0')+'-'+this.thisdate.getDate().toString().padStart(2,'0');
        }
    },
    mounted(){
        this.getdate();
    }
}
</script>
<template>
    <div class="w-full h-fit">
        <div class="accordion " id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">                
                        <img src="../../../../public/Setting/In_Stock/menu.png" class="mr-3 w-[30px]" alt="menu">
                        <span class="text-white font-bold text-2xl">客戶查詢</span> 
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="flex mb-6 flex-wrap">
                            <div class="mr-14">
                                <label for="PurchaseID">帳號</label>
                                <input id="PurchaseID" class="search" type="text">
                            </div>
                            <div class="mr-14">
                                <label for="PurchaseISBN">姓名</label>
                                <input id="PurchaseISBN" class="search" type="text">
                            </div>
                            <div class="mr-14">
                                <label for="PurchaseDate">註冊日期區間</label>
                                <div class="flex items-center">
                                    <input id="PurchaseDate" class="search" type="date" :max="maxDate">
                                    <p>　~　</p>
                                    <input id="PurchaseDate" class="search" type="date" :max="maxDate">
                                </div>
                            </div>
                            <div class="mr-14">
                                <p>帳號啟用</p>
                                <div class="text-xl font-bold">
                                    <input type="radio" class="mr-1 cursor-pointer" name="TF" id="TF1" value="">
                                    <label for="TF1" class="mr-6 cursor-pointer">無</label>
                                    
                                    <input type="radio" class="mr-1 cursor-pointer" name="TF" id="TF2" value="否">
                                    <label for="TF2" class="mr-6 cursor-pointer">是</label>

                                    <input type="radio" class="mr-1 cursor-pointer" name="TF" id="TF3" value="否">
                                    <label for="TF3" class="mr-6 cursor-pointer">否</label>
                                </div> 
                            </div>
                        </div>
                        
                        <div class="flex justify-end mt-6">
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
                        <th>帳號</th>
                        <th>姓名</th>
                        <th>密碼</th>
                        <th>email</th>
                        <th>出生年月日</th>
                        <th>註冊時間</th>
                        <th>帳號是否啟用</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in Math.floor(Math.random()*10+1)" class="text-center ">
                        <td class="py-3">
                            {{ item }}
                        </td>
                        <td>dada</td>
                        <td>人在做天在看</td>
                        <td>hayhayhay</td>
                        <td>aaa@gm.tut.edu.tw</td>
                        <td>2002/04/03</td>
                        <td>2023/08/05</td>
                        <td>是</td>
                    </tr>
                </tbody>
                <tfoot class="bg-[#bfbfff]">
                    <tr>
                        <td colspan="8" class="py-3 pr-14">
                            <div class="flex justify-end ">
                                <input type="button" class="p-1  text-3xl font-bold hover:text-red-600 hover:scale-110 active:scale-90" value="<  ">
                                <p class="p-1  text-3xl font-bold ">1</p>
                                <input type="button" class="p-1  text-3xl font-bold hover:text-red-600 hover:scale-110 active:scale-90" value="  >">
                            </div>
                        </td>
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