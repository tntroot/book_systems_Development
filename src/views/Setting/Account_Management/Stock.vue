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
            tagPage:false,
            tagAll:"",
            tagSearch:[],
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
                    iSBN:"", 
                    book_name:"", 
                    user:"", 
                    price:0, 
                    inventory:0, 
                    min_inventory:0, 
                    tag:""
                }
            },
            edit:{
                thisPage:false,

                data:{
                    stock:{
                        iSBN:"",
                        book_name:"", 
                        user:"", 
                        price:0, 
                        inventory:0, 
                        min_inventory:0, 
                        tag:""
                    },

                    oldISBN:""
                },
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
                }else{
                    this.searchData = "";
                }
                console.log(data);
            })
        },

         // 點籍取消/背景效果
         clossPage(){
            this.insert.thisPage=false;
            this.edit.thisPage = false;
            this.editStatus.page=false;
            this.tagPage = false;
            this.bgPage=false;
        },

        getBgc(item){
            this.insert.thisPage=item;
            this.editStatus.page=item;
            this.bgPage=item;
        },

        searchType(){
            this.search.tag = this.tagSearch.toString();
            this.searchAll(this.search);
        },

        // 重製
        resat(){
            const arrTag = document.getElementsByName("arrTag");
            arrTag.forEach(item =>{
                item.checked = null ;
            })
        },
        // 選擇分類
        checkTag(){
            const arrTag = document.getElementsByName("arrTag");
            this.tagSearch = [];
            arrTag.forEach(item => {
                if(item.checked === true){
                    this.tagSearch.push(item.nextSibling.innerText);
                }
            })
            this.bgPage = false;
            this.tagPage = false ;
        },
        // 清除分類
        remove(item,index){
            const arrTag = document.getElementsByName("arrTag");
            this.tagSearch.splice(index,1);
            arrTag.forEach(item2 =>{
                if(item2.nextSibling.innerText === item){
                    item2.checked = null;
                }
            })
        },

        // 新增資料
        insertData(){
            let thisinsert = this.insert.data; 

            if(!thisinsert.iSBN || !thisinsert.book_name 
                || !thisinsert.user || !thisinsert.price 
                || !thisinsert.inventory 
                || !thisinsert.min_inventory || !thisinsert.tag){
                    alert("尚有欄位未輸入");
                }
                else{
                    axios.post("http://localhost:8080/book_systems/setting/stock/add/stock",this.insert.data)
                    .then( res => res.data)
                    .then(data =>{
                        
                        this.insert.thisPage = false;
                        this.SUFFCUL_INSERT_EDIT(data,"新增");
                    })
                }
        },

        // 修改按鈕
        editBtn(item){
            this.bgPage = true;
            this.edit = {
                thisPage:true,

                data:{
                    stock:{
                        iSBN:item.iSBN,
                        book_name:item.book_name, 
                        user:item.user, 
                        price:item.price, 
                        inventory:item.inventory, 
                        min_inventory:item.min_inventory, 
                        tag:item.tag
                    },

                    oldISBN:item.iSBN
                },
            };
        },

        //修改確認
        editData(){
            let thisedit = this.edit.data; 

            if(!thisedit.stock.iSBN || !thisedit.stock.book_name 
                || !thisedit.stock.user || !thisedit.stock.price
                || !thisedit.stock.inventory 
                || !thisedit.stock.min_inventory || !thisedit.stock.tag){
                    alert("尚有欄位未輸入");
                }else{
                    console.log(thisedit);
                    axios.post("http://localhost:8080/book_systems/setting/stock/edit/stock",thisedit)
                    .then( res => res.data)
                    .then(data =>{
                        console.log(data);
                        
                        this.edit.thisPage = false;
                        this.SUFFCUL_INSERT_EDIT(data,"修改");
                    })
                }
        },

        SUFFCUL_INSERT_EDIT(dataView,status){
            if(dataView.code === "200"){
                this.editStatus = {
                    page : true,
                    text: status+"成功",
                    message: "",
                    icon: "icon-park-solid:check-one",
                    icon_style: "text-[green]"
                };
                setTimeout(() => {
                    this.editStatus.page = false;
                    this.bgPage = false;

                    this.searchAll(this.search);
                }, "2000");
            }
            else {
                this.editStatus = {
                    text: status+"失敗",
                    page : true,
                    message: dataView.message,
                    icon: "fluent-mdl2:status-error-full",
                    icon_style: "text-[red]"
                };
            }
        },
    },
    created(){
        this.searchAll(this.search);

        axios.get("http://localhost:8080/book_systems/setting/stock/search/tag")
        .then( res => res.data )
        .then( data =>{
            if(data.code==="200"){
                this.tagAll = data.bookTags;
            }
        } )
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
                            <div class="mr-14 my-2">
                                <label for="isbn">ISBN</label>
                                <input id="isbn" class="search" v-model="search.iSBN" type="text" autocomplete="on" maxlength="13">
                            </div>
                            <div class="mr-14 my-2">
                                <label for="book">書名</label>
                                <input id="book" class="search" v-model="search.bookName" type="text" autocomplete="on" maxlength="45">
                            </div>
                            <div class="mr-14 my-2">
                                <label for="name">作者</label>
                                <input id="name" class="search" v-model="search.user" type="text" autocomplete="on" maxlength="45">
                            </div>
                            <div class="mr-14 my-2">
                                <label for="stock" class="block">庫存量</label>
                                <div class="flex">
                                    <select class="p-1 border-gray-400 border-2 outline-none rounded-lg mr-1" id="compare" v-model="search.compare">
                                        <option value=">=">大於</option>
                                        <option value="<=">小於</option>
                                    </select>
                                    <input id="stock" class="search text-right w-[6rem]" v-model="search.inventory" type="number" maxlength="9">
                                </div>
                            </div>
                        </div>
                        
                        <div class="mr-14">
                            <label for="tag" class="text-xl">分類</label>
                            <!-- <input id="tag" class="search w-[80%]" type="text"> -->
                            <div class="flex flex-wrap my-3">
                                <div v-for="(item,index) in tagSearch" class="hover:scale-110 active:scale-90 cursor-pointer " @click="remove(item,index)">
                                    <div class="bg-[#c8c8c8] py-1 px-3 mr-3 my-2 text-xl font-bold rounded-lg">
                                        {{ item + ' X' }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex w-fit items-center text-xl font-bold text-[#75c0de] hover:scale-110 active:scale-90 cursor-pointer " @click="tagPage = true,bgPage = true">
                                <Icon icon="gridicons:add" />
                                <p class="ml-1">選擇分類</p>
                            </div>
                        </div>
                        <div class="flex justify-end mt-6">
                            <button type="button" class="innsert_search_btn bg-[gray]" @click="insert.thisPage=!insert.thisPage,bgPage=!bgPage">新增</button>
                            <button type="button" class="innsert_search_btn bg-[blue]" @click="searchType">查詢</button>
                        </div>
                                            
                    </div>
                </div>
            </div>
        </div>
        <div class="m-6 mb-36 max-h-[40rem] overflow-auto table_h">
            <table class="w-full table_search border-separate border-spacing-0">
                <thead class="bg-[#bfbfff] sticky top-0">
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
                            <button type="button" class="revise" @click="editBtn(item)">修改</button>
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
                    <tr v-if="searchData === ''" class="text-lg font-bold">
                        <td colspan="9" class="px-4 py-2">
                            {{ "查無資料" }}
                        </td>
                    </tr>
                </tbody>
                <tfoot class="bg-[#bfbfff] sticky bottom-0">
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

    <div v-show="tagPage" class=" w-[50%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-3 bg-white rounded-xl fixed z-50 tagePage" >
        <div class="w-full border-2 border-[#c4c4c4] p-3 rounded-xl">
            <h1 class="text-2xl font-bold">分類</h1>
            <div class="flex flex-wrap">
                <div v-for="(item,index) in tagAll">
                    <div class="text-2xl mx-3 my-2">
                        <input type="checkbox" name="arrTag" :id="'arrTag'+index" class="w-5 h-5">
                        <label :for="'arrTag'+index" class="ml-2">{{ item.tag }}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center mb-3 mt-6">
            <button type="button" class="innsert_search_btn bg-[gray]" @click="resat">重設</button>
            <button type="button" class="innsert_search_btn bg-[blue]" @click="checkTag">確定</button>
        </div>
    </div>

    <!-- 新增庫存 -->
    <div v-if="insert.thisPage" class="rounded-xl border-2 border-black px-6 py-3 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white z-10 w-[60rem]">
        <form action="#" method="post" @submit.prevent="insertData">
            <h1 class="text-center text-3xl font-bold my-6">新增庫存</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd">ISBN: </label>
                    <div class="bgc">
                        <input id="oldPwd" type="text" v-model="insert.data.iSBN" placeholder="請輸入商品的ISBN"  required autocomplete="off" maxlength="13">
                    </div>         
                </li>
                <li>  
                    <label for="newPwd">書名: </label>
                    <div class="bgc">
                        <input id="newPwd" type="text" v-model="insert.data.book_name" placeholder="請輸入書名"  required autocomplete="off" maxlength="40">
                    </div>      
                </li>
                <li>  
                    <label for="email">作者: </label>
                    <div class="bgc">
                        <input id="email" type="text" v-model="insert.data.user" placeholder="請輸入作者" required autocomplete="text" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">銷售價格: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="insert.data.price" placeholder="請輸入銷售價格" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">庫存量: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="insert.data.inventory" placeholder="請輸入庫存量" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">最低庫存量: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="insert.data.min_inventory" placeholder="請輸入最低庫存量" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li style="width: 80%;">  
                    <label for="phone" style="width: 20%;">分類: </label>
                    <div class="bgc" style="width: 100%;">
                        <input id="phone"  type="text" v-model="insert.data.tag" placeholder="請輸入分類 (以逗號區隔 ',')" required autocomplete="on" maxlength="45">
                    </div>
                </li>
                
            </ul>
            <div class="flex justify-evenly mb-6">
                <button type="button" class="py-3 px-6 bg-[#949494] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="clossPage">取消</button>
                <button type="submit" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95">新增</button>
            </div>
        </form>
    </div>

    <!-- 修改分類-->
    <div v-if="edit.thisPage" class="rounded-xl border-2 border-black px-6 py-3 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white z-10 w-[60rem]">
        <form action="#" method="post" @submit.prevent="editData()">
            <h1 class="text-center text-3xl font-bold my-6">修改庫存</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd">ISBN: </label>
                    <div class="bgc">
                        <input id="oldPwd" type="text" v-model="edit.data.stock.iSBN" placeholder="請輸入商品的ISBN"  required>
                    </div>         
                </li>
                <li>  
                    <label for="newPwd">書名: </label>
                    <div class="bgc">
                        <input id="newPwd" type="text" v-model="edit.data.stock.book_name" placeholder="請輸入書名"  required autocomplete="off" maxlength="10">
                    </div>      
                </li>
                <li>  
                    <label for="email">作者: </label>
                    <div class="bgc">
                        <input id="email" type="text" v-model="edit.data.stock.user" placeholder="請輸入作者" required autocomplete="email">
                    </div>
                </li>
                <li>  
                    <label for="phone">銷售價格: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="edit.data.stock.price" placeholder="請輸入銷售價格" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">庫存量: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="edit.data.stock.inventory" placeholder="請輸入庫存量" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li>  
                    <label for="phone">最低庫存量: </label>
                    <div class="bgc">
                        <input id="phone" type="number" v-model="edit.data.stock.min_inventory" placeholder="請輸入最低庫存量" required autocomplete="on" maxlength="10">
                    </div>
                </li>
                <li style="width: 80%;">  
                    <label for="phone" style="width: 20%;">分類: </label>
                    <div class="bgc" style="width: 100%;">
                        <input id="phone"  type="text" v-model="edit.data.stock.tag" placeholder="請輸入分類" required autocomplete="on" maxlength="10">
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
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    display: block;
                    outline: none;

                    &::-webkit-inner-spin-button,&::-webkit-outer-spin-button{
                        appearance: none;
                    }
                }
            }     
        }
    }

    .table_h{
        &::-webkit-scrollbar{
            width: 0;
        }
    }

    .tagePage{
        &::before{
            content: "X";
            position: absolute;
            font-size: 2rem;
            line-height: 1.5rem;
            top: -10%; right: -5%;
            color: white;
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
        justify-content: space-evenly;
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