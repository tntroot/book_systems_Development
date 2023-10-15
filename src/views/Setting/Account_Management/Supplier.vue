<script>
import { Icon } from '@iconify/vue';
import axios from 'axios';
export default {
    components:{
        Icon,
    },
    data() {
        return {
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
                    compiled:"",
                    email:"", 
                    phone:"", 
                    location_name:""
                }
            },
            bgPage:false,
           
        }
    },
    methods:{
        changeMap(item){
            this.search.suCity={
                mapShow:false,
                showAllMap:this.search.suCity.showAllMap,
                jobArea:item.location_name,
                thisMapId:item.location_id
            }
        },

        searchSupplier(name, complied, lo_id){
            axios.get("http://localhost:8080/search/supplier",{  
                params:{
                    name:name, 
                    compiled:complied==="" ? 0:complied, 
                    city:lo_id 
                },
                withCredentials: true,
            })
            .then( data =>{
                const arr = data.data;
                console.log(arr);
                if(arr.code==="200"){
                    this.showSupplier = arr.suppliers;
                }
            })
        },

        insertSupplier(){

        }
    },
    created(){
        axios.get("http://localhost:8080/search/location",{withCredentials: true})
            .then(data =>{
                const arrList = data.data;
                if(arrList.code==="200"){
                    this.search.suCity.showAllMap = [{location_id:"C",location_name:"地區不限"}].concat(arrList.locations);
                }
            });
        
        this.searchSupplier("",0,"");
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
                                <label for="jobArea">地區</label>
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
                            <button type="button" class="innsert_search_btn bg-[gray]" @click="insertSupplier">新增</button>
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
                        <th>供應商編號(PK)</th>
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
                            <button type="button" class="revise">修改</button>
                        </td>
                        <td>{{ item.serial_num }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.compiled }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.phone }}</td>
                        <th>{{ item.location_name }}</th>
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
  
    <div class="rounded-xl border-2 border-black px-6 py-3 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white">
        <form action="#" method="post" @submit.prevent="editCheck">
            <h1 class="text-center text-3xl font-bold my-3">新增供應商</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd">廠商名稱: </label>
                    <div>
                        <input id="oldPwd" type="text" v-model="insert.data.name" placeholder="請輸入廠商名稱"  required>
                    </div>         
                </li>
                <li>  
                    <label for="newPwd">統一編號: </label>
                    <div>
                        <input id="newPwd" type="number" v-model="insert.data.compiled" placeholder="請輸入統一編號"  required autocomplete="off">
                    </div>      
                </li>
                <li>  
                    <label for="checkNewPwd">信箱: </label>
                    <div>
                        <input id="checkNewPwd" type="email" v-model="insert.data.email" placeholder="請輸入Email" required autocomplete="email">
                    </div>
                </li>
                <li>  
                    <label for="checkNewPwd">電話: </label>
                    <div>
                        <input id="checkNewPwd" type="text" v-model="insert.data.email" placeholder="請輸入電話" required autocomplete="tel">
                    </div>
                </li>
                <li>  
                    <label for="checkNewPwd">詳細位置: </label>
                    <div>
                        <input id="checkNewPwd" type="email" v-model="insert.data.email" placeholder="請輸入詳細地址" required>
                    </div>
                </li>
            </ul>
            <div class="flex justify-center">
                <button type="button" class="py-3 px-6 bg-[#949494] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="bgc=false,editPwd=false">取消</button>
                <button type="submit" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95">新增</button>
            </div>
        </form>
    </div>
    
    <div v-show="bgPage" class="w-full h-screen bg-[#00000081] absolute ">
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
        margin: 2.5rem 5rem;
        li{
            display: flex;
            align-items: center;
            margin: 1rem 0;
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.5rem;

            label{
                margin-right: 0.75rem;
            }

            div{

                background-color: #b7b7b7;
                border-radius: 0.25rem;
                padding: 0.5rem 0.75rem;
                margin: 0 0.5rem;

                input{
                    border-bottom: 1px #757575 solid;
                    outline: none;
                    background-color: transparent;

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