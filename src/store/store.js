// 狀態資料庫
// 定義資料庫
import { defineStore } from "pinia";

// 兩個參數 1.資料庫名稱 2.資料庫內容
export default defineStore("indexStatus",{
    // date
    // state 要 return 物件時，要用()包起來，不然會被當成JS程式
    state:()=>({
        location: 10,

        isLogin: false,
        account:"",
    })
    // state:()=>{
    //     return {
    //         location: 1
    //     }
    // }

    //computed
    // 沒有 this
    // ,getters:{
    //     // text(state){
    //     //     return `12312${state.location}`
    //     // }
    //     locationInfo:(state)=>{ return `現在的位置是: ${state.location}`}
    // }
    ,

    // methods
    // 有 this
    actions:{
        getLocation(state){
            console.log(this.location);
        },
        setLocation(num){
            this.location=num;
        },

        getIsLogin(){
            console.log("hi")
            return [this.isLogin,this.account];
        },
        setISLogin(login,account){
            this.isLogin = login;
            this.account = account;
        }
    }
});