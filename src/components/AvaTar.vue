<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
    emits: ["imageBase64"],
    props: {
        avatar: String,
    },
    data() {
        return {
            CROPPER: null, //創建一个cropper的全局對象
        }
    },
    methods:{
        handleFile(e) {
            const file = e.target.files[0];
            const reader = new FileReader();

            const dia = document.querySelector("#dia");
            dia.showModal();

            reader.readAsDataURL(file);
            reader.onload = (e) => {
                let catchImg = document.getElementById("catchImg");
                // this.avatar = e.target.result;
                catchImg.src = e.target.result;

                this.CROPPER = new Cropper(catchImg, {
                    aspectRatio: 16 / 16,    //固定裁剪框的比例（横/竖）,此处16/16则固定为正方形
                    minContainerWidth:500,   //容器最小的宽度
                    minContainerHeight:300,  //容器最小的高度
                    dragMode:'move',         //设置裁剪框为可以移动
                    preview:[ document.querySelector('.previewBoxRound') ]
                })
            };
        },
        closeDia(e){
            const dialog = document.querySelector('#dia');
            const rect = dialog.getBoundingClientRect();
            var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                dialog.close();
            }
        },
        cheackIMG(){
            const dialog = document.querySelector('#dia');
            const imageBase64 = this.CROPPER.getCroppedCanvas({
                maxWidth: 4096,
                maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            }).toDataURL("image.jpg");
            
            dialog.close();
            this.$emit("imageBase64", imageBase64);
            console.log(imageBase64);

        },
    }
}
</script>

<template>
    <div class="head_img" onmouseover="text_area.style.display = 'flex'" onmouseout="text_area.style.display = 'none'">
        <input type="file" id="f" accept="image/*" @change="handleFile" class="hiddenInput" style="display:none"> 
        <img id="img" class="avatarImg" :src="avatar">
        <div class="text_area" id="text_area" onclick="f.click()" @click="CROPPER ? CROPPER.destroy() : ''">上傳圖片</div>
    </div>
    
    <dialog id="dia" class="dia" @click="closeDia">
        <h1 class=" text-center text-4xl font-bold my-3"><Icon icon="openmoji:scissors" class=" inline-block" /> 裁剪頭像</h1>
        <div class="flex p-6 items-center">
            <div class="w-[65%] h-[350px] bg-[#123456]">
                <img id="catchImg" class=" object-contain   w-[100%] h-[100%]">
            </div>
            <div class="bg-[#8a8a8a] w-1 h-[350px] mx-3"></div>
            <div class="w-[30%] flex items-center justify-center">
                <div class="previewBoxRound">裁剪预览</div>
            </div>
        </div>
        <div class="flex justify-between w-[25%] mx-auto">
            <button type="button" class="btn btn-secondary btn-lg show" onclick="dia.close()">取消</button>
            <button type="button" class="btn btn-primary btn-lg show" @click="cheackIMG">確定</button>
        </div>
    </dialog>
</template>

<style lang="scss" scoped>  
    .previewBoxRound{
        box-shadow: 0 0 5px #adadad;
        width: 300px;
        height: 300px;
        margin-top: 30px;
        overflow: hidden;  
        border-radius: 50%;
    }

    .dia{
        padding: 1rem;
        border: none;
        border-radius: 1.5rem;
        outline: none;
        width: 60vw; 
    }
    .head_img{
        width: 15rem;
        margin: 1.5rem auto 3rem auto;
        border-radius: 9999px;
        cursor: pointer;
        position: relative;

        // &:hover{
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     position: absolute;
        //     width: inherit;
        //     height: 15rem;
        //     font-size: 1.5rem;
        //     background-color: rgba(60, 107, 161, 0.637);
        //     color: white;
        //     font-weight: bolder;
        //     border-radius: 15rem;
        //     bottom: 0;
        // }

        .avatarImg{
            width: 15rem;
            border-radius: 9999px;
        }

        .text_area{
            display: none;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 15rem;
            height: 15rem;
            font-size: 1.5rem;
            background-color: rgba(60, 107, 161, 0.637);
            color: white;
            font-weight: bolder;
            border-radius: 15rem;
            bottom: 0;
        }
    }
</style>