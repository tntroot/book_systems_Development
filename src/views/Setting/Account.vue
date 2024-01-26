<script>
import axios from 'axios';
import SuffcusOrError from '../../components/SuffcusOrError.vue';
import Bgc from '../../components/Bgc.vue';
import AvaTar from '../../components/AvaTar.vue';
export default {
    data() {
        return {
            thisUserData: "",
            Account: "",
            born: null,
            email: "",
            name: "",
            passwork: "********",
            redate: "",
            minYear: "",
            maxYear: "",

            updateAvatar: "",

            /**
             * @param {boolean} editPwd 呼出修改密碼介面
             * @param {boolean} editPwdCheck 驗證密碼是否修改成功介面
             */
            editPwdPage: {
                editPwd: false,
                editPwdCheck: false,
                passwork_eye: true,
                repasswork_eye: true
            },
            /**
             * @param {string} text 修改成功/修改失敗
             * @param {string} meesage 訊息
             * @param {string} icon icon
             * @param {string} icon_style icon 樣式
             */
            editStatus: {
                text: "",
                message: "",
                icon: "",
                icon_style: ""
            },
            bgc: false
        };
    },
    methods: {
        seetting() {
            const thisdate = new Date(); // 現在時間
            const user_data = this.$route.query.user_data;
            this.Account = user_data.account;
            this.name = user_data.user_name;
            this.email = user_data.email;
            this.born = !user_data.born ? null : user_data.born.split('T')[0];
            this.minYear = eval(thisdate.getFullYear() + "-100") + "-01-01";
            // this.maxYear=thisdate.getFullYear() + "-" + (thisdate.getMonth()+1).toString().padStart(2,'0') + "-" + thisdate.getDate().toString().padStart(2,'0');
            this.maxYear = thisdate.toLocaleString('sv').split(' ')[0];
            this.thisUserData = user_data.manager;

            this.updateAvatar = user_data.img ? `data:image/png;base64, ${user_data.img}`  : "../../../public/people.png";

            console.log(user_data);
        },
        editUser() {
            const thisBorn = new Date(this.born);
            const thisMaxYear = new Date(this.maxYear);
            if (!this.born || !this.name) {
                alert("尚有欄位未輸入");
            }
            else if (thisBorn > thisMaxYear) {
                alert("生日不可大於今天日期", eval(thisMaxYear - thisBorn));
            }
            else {
                axios.post("http://localhost:8080/book_systems/setting/editUser", {
                    "user_name": this.name,
                    "born": this.born,
                    "img": this.updateAvatar,
                    "account": this.Account
                }, { withCredentials: true })
                    .then(res => res.data)
                    .then(data => {
                    if (data.code === "200") {
                        alert('成功修改');
                    }
                    else {
                        alert(data.message);
                    }
                });
            }
        },
        editCheck() {
            const oldPwd = document.getElementById("oldPwd").value;
            const newPwd = document.getElementById("newPwd").value;
            const checkNewPwd = document.getElementById("checkNewPwd").value;
            if (checkNewPwd !== newPwd) {
                alert("新密碼與確認密碼不一致");
                return;
            }
            axios.post("http://localhost:8080/book_systems/setting/editPwd", {
                "oldPwd": oldPwd,
                "newPwd": newPwd,
                "account": this.Account
            }, { withCredentials: true })
                .then(res => res.data)
                .then(data => {
                this.editPwdPage.editPwdCheck = true;
                this.editPwdPage.editPwd = false;
                if (data.code === "200") {
                    this.editStatus = {
                        text: "修改成功",
                        meesage: "",
                        icon: "icon-park-solid:check-one",
                        icon_style: "text-[green]"
                    };
                    setTimeout(() => {
                        this.editPwdPage.editPwdCheck = false;
                        this.bgc = false;
                    }, "1000");
                }
                else {
                    this.editStatus = {
                        text: "修改失敗",
                        message: data.message,
                        icon: "fluent-mdl2:status-error-full",
                        icon_style: "text-[red]"
                    };
                }
                console.log(data);
            });
        },

        getBgc(item){
            this.bgc = item;
            this.editPwdPage.editPwdCheck = item;
        },
    },
    mounted() {
        this.seetting();
    },
    components: { SuffcusOrError, Bgc, AvaTar, }
}
</script>
<template>
    <form class=" border-2 border-gray-600 rounded-xl p-11 mx-auto my-12">

        <div class="py-6 w-full text-center font-bold text-3xl border-b-2 border-b-[#bdbdbd] mb-6">修改個人資訊</div>
        <AvaTar :avatar="updateAvatar" @imageBase64="updateAvatar = $event" />
        <div class="flex mb-3">
            <div class="mx-6">
                <label for="Account" class="block text-xl text-bold">{{ thisUserData === 2 ? '帳號' : '人員編號'}}</label>
                <input id="Account" type="text" class="p-2 rounded-lg border-2 border-gray-300" v-model="Account" disabled>
            </div>
            <div class="mx-6">
                <label for="Name" class="block text-xl text-bold">姓名</label>
                <input id="Name" type="text" class="p-2 rounded-lg border-2 border-gray-300" v-model="name" autocomplete="on">
            </div>
        </div>
        <div class="flex mb-3">
            <div class="mx-6">
                <label for="Email" class="block text-xl text-bold">信箱</label>
                <input id="Email" type="email" class="p-2 rounded-lg border-2 border-gray-300" v-model="email" disabled autocomplete="off">
            </div>
            <div class="mx-6">
                <label for="Born" class="block text-xl text-bold">出生年月日</label>
                <input id="Born" type="date" :min="minYear" :max="maxYear" class="p-2 rounded-lg border-2 border-gray-300" v-model="born">
            </div>
        </div>
        <div class="mx-6">
            <label for="pwd" class="block text-xl text-bold">密碼</label>
            <input id="pwd" type="password" class="p-2 rounded-lg border-2 border-gray-300" v-model="passwork" disabled autocomplete="off">
            <div class="text-blue-600 hover:text-red-600 active:scale-95 cursor-pointer text-xl inline-block ml-3" @click="editPwdPage.editPwd = true,bgc = true">修改</div>
        </div>
        <button type="button" class="px-14 py-3 mt-6 text-white bg-gray-500 mx-auto rounded-xl text-xl font-bold block hover:scale-105 active:scale-95" @click="editUser">儲存</button>
    </form>

    <!-- 修改密碼 -->
    <div v-if="editPwdPage.editPwd" class="w-[500px] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border p-6 rounded-2xl z-10">
        <form action="#" method="post" @submit.prevent="editCheck">
            <h1 class="text-center text-3xl font-bold my-3">修改密碼</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd">舊密碼: </label>
                    <div class="inputdiv">
                        <input id="oldPwd" type="text" placeholder="請輸入舊密碼"  required>
                    </div>         
                </li>
                <li>  
                    <label for="newPwd">新密碼: </label>
                    <div class="inputdiv">
                        <input id="newPwd" :type="editPwdPage.passwork_eye ? 'password':'text'" placeholder="請輸入新密碼"  required>
                        <Icon :icon="editPwdPage.passwork_eye ? 'mdi:eye-off':'mdi:eye'" class=" absolute -right-10 text-3xl top-[50%] -translate-y-[50%] cursor-pointer active:scale-90 hover:scale-110" @click="editPwdPage.passwork_eye = !editPwdPage.passwork_eye" />
                    </div> 
                </li>
                <li>
                    <div>
                        <p class="text-red-600 text-xl -mt-2">(請輸入 8~16位密碼，並包含</p>
                        <p class="text-red-600 text-xl -mt-2"> 小寫字母、大寫字母、數字 各一個)</p> 
                    </div> 
                </li>
                <li>  
                    <label for="checkNewPwd">確認密碼: </label>
                    <div class="inputdiv">
                        <input id="checkNewPwd" :type="editPwdPage.repasswork_eye ? 'password':'text'" placeholder="請輸入確認密碼" required>
                        <Icon :icon="editPwdPage.repasswork_eye ? 'mdi:eye-off':'mdi:eye'" class=" absolute -right-10 text-3xl top-[50%] -translate-y-[50%] cursor-pointer active:scale-90 hover:scale-110" @click="editPwdPage.repasswork_eye = !editPwdPage.repasswork_eye" />
                    </div>
                </li>
            </ul>
            <div class="flex justify-evenly">
                <button type="button" class="py-3 px-6 bg-[#949494] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="bgc=false,editPwdPage.editPwd=false">取消</button>
                <button type="submit" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95">修改</button>
            </div>
        </form>
    </div>

    <!-- 修改成功 -->
    <SuffcusOrError v-else-if="editPwdPage.editPwdCheck" :text="editStatus.text" :message="editStatus.message" :icon="editStatus.icon" :icon_style="editStatus.icon_style" @bgc="getBgc" />

    <!-- 背景 -->
    <Bgc v-if="bgc" @click="editPwdPage.editPwdCheck = false, bgc = false, editPwdPage.editPwd=false" />
</template>

<style lang="scss" scoped>
    .editContent{
        margin: 2.5rem auto;
        width: fit-content;
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
            .inputdiv{
                position: relative;
                background-color: #b7b7b7;
                border-radius: 0.25rem;
                padding: 0.5rem 0.75rem;
                margin: 0 0.5rem;

                input[type="text"],input[type="password"]{
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
   
            }   
        }
    }
    
</style>