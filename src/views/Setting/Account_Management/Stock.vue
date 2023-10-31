<script>
import axios from 'axios';
import Bgc from '../../../components/Bgc.vue';
import SuffcusOrError from '../../../components/SuffcusOrError.vue';

export default {
    components:{
        Bgc,SuffcusOrError,
    },
    data() {
        return {
            search:{
                iSBN:"",
                bookName:"",
                user:"",
                compare:">=",
                inventory:0,
                tag:""
            },
            searchData:"",

            insert:{
                thisPage:false,

                data:{
                    name:"",
                    compiled:0,
                    email:"", 
                    phone:"", 
                    location_name:"",
                }
            },
            edit:{
                thisPage:false,

                data:{
                    serial_num:"",

                    name:"",
                    compiled:"",
                    email:"", 
                    phone:"", 
                    location_name:"",
                },
                oldCompiled:""
            },

            editStatus: {
                page:false,
                text: "",
                message: "",
                icon: "",
                icon_style: ""
            },

            bgPage:false,
        }
    },
    methods:{
        searchAll(thisSearch){
            axios.post("http://localhost:8080/book_systems/setting/stock/search/stock",thisSearch)
            .then(res => res.data)
            .then(data =>{
                if(data.code === "200"){
                    this.searchData = data.stocks;
                }
            })
        },

         // 點籍取消/背景效果
         clossPage(){
            this.insert.thisPage=false;
            this.edit.thisPage = false;
            this.editStatus.page=false;
            this.bgPage=false;
        },

        getBgc(item){
            this.insert.thisPage=item;
            this.editStatus.page=item;
            this.bgPage=item;
        },
    },
    created(){
        this.searchAll(this.search);
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
                        <span class="text-white font-bold text-2xl">庫存查詢</span> 
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="flex mb-6 flex-wrap">
                            <div class="mr-14">
                                <label for="isbn">ISBN</label>
                                <input id="isbn" class="search" type="text" autocomplete="on">
                            </div>
                            <div class="mr-14">
                                <label for="book">書名</label>
                                <input id="book" class="search" type="text" autocomplete="on">
                            </div>
                            <div class="mr-14">
                                <label for="name">作者</label>
                                <input id="name" class="search" type="text" autocomplete="on">
                            </div>
                            <div class="mr-14">
                                <label for="stock" class="block">庫存量</label>
                                <div class="flex">
                                    <select class="p-1 border-gray-400 border-2 outline-none rounded-lg mr-1" id="compare">
                                        <option value=">">大於</option>
                                        <option value="<">小於</option>
                                    </select>
                                    <input id="stock" class="search" type="number">
                                </div>
                            </div>
                        </div>
                        
                        <div class="mr-14">
                            <label for="tag">分類</label>
                            <input id="tag" class="search w-[80%]" type="text">
                        </div>
                        <div class="flex justify-end mt-6">
                            <button type="button" class="innsert_search_btn bg-[gray]" @click="insert.thisPage=!insert.thisPage,bgPage=!bgPage">新增</button>
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
                    <tr v-for="(item) in searchData" class="text-center ">
                        <td class="py-3">
                            <button type="button" class="revise">修改</button>
                        </td>
                        <td>{{ item.iSBN }}</td>
                        <td>{{ item.book_name }}</td>
                        <td>{{ item.user }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.sales }}</td>
                        <td>{{ item.inventory }}</td>
                        <td>{{ item.min_inventory }}</td>
                        <td>{{ item.tag.replace(",","、") }}</td>
                    </tr>
                </tbody>
                <tfoot class="bg-[#bfbfff]">
                    <tr>
                        <td colspan="9" class="py-3 pr-14">
                            <div v-if="false" class="flex justify-end ">
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

    <!-- 新增供應商 -->
    <div v-if="insert.thisPage" class="rounded-xl border-2 border-black px-6 py-3 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white z-10 w-[60rem]">
        <form action="#" method="post" @submit.prevent="insertData">
            <h1 class="text-center text-3xl font-bold my-6">新增庫存</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd">ISBN: </label>
                    <div class="bgc">
                        <input id="oldPwd" type="text" v-model="insert.data.name" placeholder="請輸入商品的ISBN"  required>
                    </div>         
                </li>
                <li>  
                    <label for="newPwd">書名: </label>
                    <div class="bgc">
                        <input id="newPwd" type="text" v-model="insert.data.compiled" placeholder="請輸入書名"  required autocomplete="off" maxlength="10">
                    </div>      
                </li>
                <li>  
                    <label for="email">作者: </label>
                    <div class="bgc">
                        <input id="email" type="text" v-model="insert.data.email" placeholder="請輸入作者" required autocomplete="email">
                    </div>
                </li>
                <li>  
                    <label for="phone">銷售價格: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="insert.data.phone" placeholder="請輸入銷售價格" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">庫存量: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="insert.data.phone" placeholder="請輸入庫存量" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">最低庫存量: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="insert.data.phone" placeholder="請輸入最低庫存量" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">分類: </label>
                    <div class="bgc">
                        <input id="phone" type="text" v-model="insert.data.phone" placeholder="請輸入分類" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                
            </ul>
            <div class="flex justify-evenly mb-6">
                <button type="button" class="py-3 px-6 bg-[#949494] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="clossPage">取消</button>
                <button type="submit" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95">新增</button>
            </div>
        </form>
    </div>

    <!-- 修改供應商 -->
    <div v-if="edit.thisPage" class="rounded-xl border-2 border-black px-6 py-3 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white z-10 min-w-[40rem]">
        <form action="#" method="post" @submit.prevent="editData(edit.data.serial_num)">
            <h1 class="text-center text-3xl font-bold my-6">修改供應商</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd2">廠商名稱: </label>
                    <div class="bgc">
                        <input id="oldPwd2" type="text" v-model="edit.data.name" placeholder="請輸入廠商名稱"  required>
                    </div>         
                </li>
                <li>  
                    <label for="newPwd2">統一編號: </label>
                    <div class="bgc">
                        <input id="newPwd2" type="number" v-model="edit.data.compiled" placeholder="請輸入統一編號"  required autocomplete="off" maxlength="10">
                    </div>      
                </li>
                <li>  
                    <label for="email2">信　　箱: </label>
                    <div class="bgc">
                        <input id="email2" type="email" v-model="edit.data.email" placeholder="請輸入Email" required autocomplete="email">
                    </div>
                </li>
                <li>  
                    <label for="phone2">電　　話: </label>
                    <div class="bgc">
                        <input id="phone2" type="text" v-model="edit.data.phone" placeholder="請輸入電話" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="location">地　　址: </label>
                    <div>
                        <button type="button" id="jobArea" class=" relative bg-gray-50 border-2 border-gray-300 text-gray-900 w-[150px] rounded-lg focus:ring-blue-500 focus:border-blue-500 mr-1 mx-1 cursor-pointer my-1 group" >
                            <div class="flex items-center justify-evenly p-2.5" @click="location_name.mapShow = !location_name.mapShow">
                                <!-- @click="location_name.mapShow = !location_name.mapShow" -->
                                <p>{{ location_name.jobArea }}</p>
                                <Icon icon="iconamoon:arrow-down-2-bold" width="20" />
                            </div>
                            <div v-show="location_name.mapShow" tabindex="0" class="mapAndPriceSelect shadow-xl">
                                <div v-for="(item, index) in location_name.showAllMap"
                                    class=" font-bold py-3 pl-3 cursor-pointer hover:bg-blue-300 hover:text-white"
                                    @click="changeMapInsertAndUpdate(item);">
                                    <input type="radio" :id="'showMap' + index" name="thismap" class="mr-3 cursor-pointer" :value="item.location_id"
                                        :checked="location_name.jobArea === item.location_name">
                                    <label :for="'showMap' + index" class="cursor-pointer">{{ item.location_name }}</label>
                                </div>
                            </div>
                        </button>
                        <div class="bgc">
                            <input type="text" v-model="edit.data.location_name" placeholder="請輸入詳細地址" required>
                        </div>    
                    </div>
                </li>
            </ul>
            <div class="flex justify-evenly mb-6">
                <button type="button" class="py-3 px-6 bg-[#949494] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="clossPage">取消</button>
                <button type="submit" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95">修改</button>
            </div>
        </form>
    </div>
    
    <!-- 修改成功 -->
    <SuffcusOrError v-else-if="editStatus.page" :text="editStatus.text" :message="editStatus.message" :icon="editStatus.icon" :icon_style="editStatus.icon_style" @bgc="getBgc" />

    <!-- 背景 -->
    <Bgc v-if="bgPage" @click="clossPage" />
   
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

    // 新增/修改介面
    .editContent{
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        li{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.5rem;
            width: 20rem;

            label{
                margin-right: 0.75rem;
                width: 60%;
            }

            .bgc{

                background-color: #b7b7b7;
                border-radius: 0.25rem;
                padding: 0.75rem 1rem;
                margin: 0 0.5rem;

                input{
                    border-bottom: 1px #757575 solid;
                    outline: none;
                    background-color: transparent;
                    width: 100%;

                    &:-webkit-autofill{
                        
                        -webkit-text-fill-color: rgb(0, 0, 0);
                        -webkit-box-shadow: 0 0 0px 1000px #b7b7b7 inset;
                        transition: background-color 5000s ease-in-out 0s;
                        box-shadow: transparent;
                    }

                    &::placeholder{
                        color: #3d3d3d;
                    }
                }

                input[type=number]{
                    &::-webkit-inner-spin-button,&::-webkit-outer-spin-button{
                        appearance: none;
                    }
                }
            }
            
        }
    }

</style>