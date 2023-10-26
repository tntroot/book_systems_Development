<script>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import Bgc from '../../../components/Bgc.vue';
import SuffcusOrError from '../../../components/SuffcusOrError.vue';
export default {
    components:{
    Icon, Bgc,SuffcusOrError
    },
    data() {
        return {

            location_name:{
                mapShow:false,
                showAllMap:[],
                jobArea: "台北市",
                thisMapId: "A"
            },

            search:{
                suName:"",
                suComplied:"",
                suCity:{
                    mapShow: false,
                    showAllMap: [],
                    jobArea: "地區不限",
                    thisMapId: ""
                }
            },

            showSupplier:"",

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
                    name:"",
                    compiled:0,
                    email:"", 
                    phone:"", 
                    location_name:"",

                    serial_num:""
                }
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

        // 查詢地區
        changeMap(item){
            this.search.suCity={
                mapShow:false,
                showAllMap:this.search.suCity.showAllMap,
                jobArea:item.location_name,
                thisMapId:item.location_id
            }
        },

        // 新增/修改葉面 地區
        changeMapInsertAndUpdate(item){
            this.location_name = {
                mapShow:false,
                showAllMap: this.location_name.showAllMap,
                jobArea:item.location_name,
                thisMapId:item.location_id
            }
        },

        // 查詢功能
        searchSupplier(name, complied, lo_id){
            axios.get("http://localhost:8080/book_systems/supplier/search/supplier",{  
                params:{
                    name:name, 
                    compiled:(complied==="" || complied<=0 ) ? 0:complied, 
                    city:lo_id 
                },
                withCredentials: true,
            })
            .then( data =>{
                let arr = data.data;

                if(arr.code==="200"){
                    this.showSupplier = arr.suppliers;

                    // 縣市 + 地址
                    this.showSupplier.map((item1) => {
                        Object.values(this.search.suCity.showAllMap).forEach((item2) => {
                            if(item1.location_id === item2.location_id && !item1.location_name.includes(item2.location_name)){
                                return item1["location_idName"]  = item2.location_name + item1.location_name;
                            }
                        })
                    })
                }
                console.log(this.showSupplier);
            })
        },

        // 檢查詳細地址裡是否有縣市名
        includes_Job(index){
            return index.location_name.includes(this.location_name.jobArea);
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

                    this.searchSupplier(this.search.suName,this.search.suComplied,this.search.suCity.thisMapId);
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
        // 新增功能
        insertData(){

            let thisinsert = this.insert.data; 

            if(!thisinsert.name || !thisinsert.compiled 
                || !thisinsert.email || !thisinsert.phone 
                || !this.location_name.thisMapId 
                || !thisinsert.location_name){
                    alert("尚有欄位未輸入");
                }else if( this.includes_Job(thisinsert)){
                    alert("詳細地址與縣市地址不同");
                }else if(thisinsert.compiled > 2100000000){
                    alert("統一編號格式錯誤")
                }
                else{
                    axios.post("http://localhost:8080/book_systems/supplier/add/supplier",{
                        "name":thisinsert.name, 
                        "compiled":thisinsert.compiled, 
                        "email":thisinsert.email, 
                        "phone":thisinsert.phone, 
                        "location_id":this.location_name.thisMapId, 
                        "location_name": this.includes_Job(thisinsert) ? thisinsert.location_name.split(this.location_name.jobArea)[1]:thisinsert.location_name
                    })
                    .then( res => res.data)
                    .then(data =>{
                        
                        this.insert.thisPage = false;
                        this.SUFFCUL_INSERT_EDIT(data,"新增");
                    })
                }
        },
        // 修改資料
        editData(supplier_id){
            let thisedit = this.edit.data; 

            if(!thisedit.name || !thisedit.compiled 
                || !thisedit.email || !thisedit.phone 
                || !this.location_name.thisMapId 
                || !thisedit.location_name){
                    alert("尚有欄位未輸入");
                }else if( this.includes_Job(thisedit)){
                    alert("詳細地址與縣市地址不同");
                }else{
                    axios.post("http://localhost:8080/book_systems/supplier/update/supplier",{
                        "name":thisedit.name, 
                        "compiled":thisedit.compiled, 
                        "email":thisedit.email, 
                        "phone":thisedit.phone, 
                        "location_id":this.location_name.thisMapId, 
                        "location_name": this.includes_Job(thisedit) ? thisedit.location_name.split(this.location_name.jobArea)[1]:thisedit.location_name,

                        "serial_num":supplier_id
                    })
                    .then( res => res.data)
                    .then(data =>{
                        
                        this.edit.thisPage = false;
                        this.SUFFCUL_INSERT_EDIT(data,"修改");
                    })
                }
        },

        editBtn(item){
            this.bgPage = true;
            this.edit = {
                thisPage:true,

                data:{
                    name:item.name,
                    compiled:item.compiled,
                    email:item.email, 
                    phone:item.phone, 
                    location_name:item.location_name,

                    serial_num:item.serial_num
                }
            };
            this.location_name.jobArea = this.location_name.showAllMap.find( i => i.location_id.includes(item.location_id)).location_name;
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
        axios.get("http://localhost:8080/book_systems/supplier/search/location",{withCredentials: true})
            .then(data =>{
                const arrList = data.data;
                if(arrList.code==="200"){
                    this.location_name.showAllMap = arrList.locations;
                    this.search.suCity.showAllMap = [{location_id:"",location_name:"地區不限"}].concat(arrList.locations);
                }
            });
        
        this.searchSupplier("",0,"");
    },
}
</script>
<template>
    <div class="w-full h-fit">
        <div class="accordion " id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">                
                        <Icon icon="ant-design:bars-outlined" class="mr-3 w-[30px] text-white text-3xl"/>   
                        <span class="text-white font-bold text-2xl">供應商查詢</span> 
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="flex mb-6 flex-wrap">
                            
                            <div class="mr-14">
                                <label for="book">供應商名稱</label>
                                <input id="book" class="search" type="text" v-model="search.suName">
                            </div>
                            <div class="mr-14">
                                <label for="name">供應商統編</label>
                                <input id="name" class="search" type="number" autocomplete="off" v-model="search.suComplied">
                            </div>

                            <!-- 地區 select -->
                            <div class="mr-14">
                                <p>地區</p>
                                <div id="jobArea" class=" relative bg-gray-50 border border-gray-300 text-gray-900 w-[150px] rounded-lg focus:ring-blue-500 focus:border-blue-500 mr-1 mx-1 cursor-pointer" 
                                    @mousemove="search.suCity.mapShow = true" @mouseleave="search.suCity.mapShow=false">
                                    <div class="flex items-center justify-evenly m-2.5">
                                        <p>{{ search.suCity.jobArea }}</p>
                                        <Icon icon="iconamoon:arrow-down-2-bold" width="20" />
                                    </div>
                                    <div v-if="search.suCity.mapShow" class="mapAndPriceSelect shadow-xl">
                                        <div v-for="(item, index) in search.suCity.showAllMap"
                                            class=" font-bold py-3 pl-3 cursor-pointer hover:bg-blue-300 hover:text-white"
                                            @click="changeMap(item);">
                                            <input type="radio" :id="'showMap' + index" name="thismap" class="mr-3 cursor-pointer" :value="item.location_id"
                                                :checked="search.suCity.jobArea === item.location_name">
                                            <label :for="'showMap' + index" class="cursor-pointer">{{ item.location_name }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end mt-6">
                            <button type="button" class="innsert_search_btn bg-[gray]" @click="insert.thisPage=!insert.thisPage,bgPage=!bgPage">新增</button>
                            <button type="button" class="innsert_search_btn bg-[blue]" @click="searchSupplier(search.suName,search.suComplied,search.suCity.thisMapId)">查詢</button>
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
                        <th>供應商編號</th>
                        <th>供應商名稱</th>
                        <th>供應商統編</th>
                        <th>email</th>
                        <th>電話</th>
                        <th>聯絡地址</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in showSupplier" class="text-center ">
                        <td class="py-3">
                            <button type="button" class="revise" @click="editBtn(item)">修改</button>
                        </td>
                        <td>{{ item.serial_num }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.compiled }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.phone }}</td>
                        <th>{{ item.location_idName }}</th>
                    </tr>
                </tbody>
                <tfoot class="bg-[#bfbfff]">
                    <tr>
                        <td colspan="7" class="py-3 pr-14">
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
  
    <!-- 新增供應商 -->
    <div v-if="insert.thisPage" class="rounded-xl border-2 border-black px-6 py-3 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white z-10 min-w-[40rem]">
        <form action="#" method="post" @submit.prevent="insertData">
            <h1 class="text-center text-3xl font-bold my-6">新增供應商</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd">廠商名稱: </label>
                    <div class="bgc">
                        <input id="oldPwd" type="text" v-model="insert.data.name" placeholder="請輸入廠商名稱"  required>
                    </div>         
                </li>
                <li>  
                    <label for="newPwd">統一編號: </label>
                    <div class="bgc">
                        <input id="newPwd" type="number" v-model="insert.data.compiled" placeholder="請輸入統一編號"  required autocomplete="off" maxlength="10">
                    </div>      
                </li>
                <li>  
                    <label for="email">信　　箱: </label>
                    <div class="bgc">
                        <input id="email" type="email" v-model="insert.data.email" placeholder="請輸入Email" required autocomplete="email">
                    </div>
                </li>
                <li>  
                    <label for="phone">電　　話: </label>
                    <div class="bgc">
                        <input id="phone" type="text" v-model="insert.data.phone" placeholder="請輸入電話" required autocomplete="on" maxlength="10">
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
                                    class=" font-bold py-3 pl-3 cursor-pointer hover:bg-blue-300 hover:text-white group-active:first-letter:scale-0"
                                    @click="changeMapInsertAndUpdate(item);">
                                    <input type="radio" :id="'showMap' + index" name="thismap" class="mr-3 cursor-pointer" :value="item.location_id"
                                        :checked="location_name.jobArea === item.location_name">
                                    <label :for="'showMap' + index" class="cursor-pointer">{{ item.location_name }}</label>
                                </div>
                            </div>
                        </button>
                        <div class="bgc">
                            <input id="location" type="text" v-model="insert.data.location_name" placeholder="請輸入詳細地址 (不含縣市)" required>
                        </div>    
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
            <h1 class="text-center text-3xl font-bold my-6">新增供應商</h1>
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

    // 下拉選單
	.mapAndPriceSelect {
		// padding: 0.75rem 2rem 0.75rem 1.5rem;
		width: 100%;
		position: absolute;
		background: white;
		max-height: 200px;
		overflow: auto;
		border: 2px rgb(200, 200, 200) solid;
		border-radius: 0.75rem;
		z-index: 50;

		&::-webkit-scrollbar-thumb {
			background: #9b9b9b;
			border-radius: 9999px;
		}

		&::-webkit-scrollbar {
			width: 5px;
		}
	}

    // 新增/修改介面
    .editContent{
        margin: 0 auto;
        li{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.5rem;

            label{
                margin-right: 0.75rem;
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
                    width: 20rem;

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