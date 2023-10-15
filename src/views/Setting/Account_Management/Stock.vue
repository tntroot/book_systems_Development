<script>
export default {
    
}
</script>
<template>
    <div class="w-full h-fit">
        <div class="accordion " id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">                
                        <Icon icon="ant-design:bars-outlined" class="mr-3 w-[30px] text-white text-3xl"/>    
                        <span class="text-white font-bold text-2xl">庫存查詢</span> 
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="flex mb-6 flex-wrap">
                            <div class="mr-14">
                                <label for="isbn">ISBN</label>
                                <input id="isbn" class="search" type="text">
                            </div>
                            <div class="mr-14">
                                <label for="book">書名</label>
                                <input id="book" class="search" type="text">
                            </div>
                            <div class="mr-14">
                                <label for="name">作者</label>
                                <input id="name" class="search" type="text">
                            </div>
                            <div class="mr-14">
                                <label for="stock" class="block">庫存量</label>
                                <div class="flex">
                                    <select class="p-1 border-gray-400 border-2 outline-none rounded-lg mr-1" name="" id="">
                                        <option value=">">大於</option>
                                        <option value="<">小於</option>
                                    </select>
                                    <input id="stock" class="search" type="number">
                                </div>
                            </div>
                        </div>
                        
                        <div class="mr-14">
                            <label for="tag">分類</label>
                            <input class="search w-[80%]" type="text">
                        </div>
                        <div class="flex justify-end mt-6">
                            <button type="button" class="innsert_search_btn bg-[gray]">新增</button>
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
                        <th class="py-3"> </th>
                        <th>ISBN</th>
                        <th>書名</th>
                        <th>作者</th>
                        <th>銷售價格</th>
                        <th>銷售量</th>
                        <th>庫存量</th>
                        <th>最低庫存量</th>
                        <th>分類</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in Math.floor(Math.random()*10+1)" class="text-center ">
                        <td class="py-3">
                            <button type="button" class="revise">修改</button>
                        </td>
                        <td>9456123785462</td>
                        <td>客家獅</td>
                        <td>kasai</td>
                        <td>$ 150</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>100</td>
                        <td>休閒、娛樂</td>
                    </tr>
                </tbody>
                <tfoot class="bg-[#bfbfff]">
                    <tr>
                        <td colspan="9" class="py-3 pr-14">
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