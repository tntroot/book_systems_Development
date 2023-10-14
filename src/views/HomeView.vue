<script>
  export default{
    data() {
      return {
        titleStyle:[{
          name:'促銷中的商品',
          bg:'linear-gradient(rgb(80, 173, 255), rgba(249, 249, 249, 0.999))',
          border_bottom:'#5fd7f5 solid 5px'
        },{
          name:'新書上市',
          bg:'linear-gradient(rgb(124, 255, 80), rgba(249, 249, 249, 0.999))',
          border_bottom:'rgb(114 245 95) solid 5px'
        },{
          name:'中文書',
          bg:'linear-gradient(rgb(182, 80, 255), rgba(249, 249, 249, 0.999))',
          border_bottom:'rgb(182, 80, 255) solid 5px'
        },{
          name:'外文書',
          bg:'linear-gradient(rgb(255, 80, 97), rgba(249, 249, 249, 0.999))',
          border_bottom:'rgb(255, 80, 97) solid 5px'
        }]
      }
    },
  }
</script>

<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
        aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
        aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
        aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
        aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../../public/caruful/unsplash_693RRbiTAaI.jpg" class="d-block w-100 h-[480px]" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../public/caruful/unsplash__nm_mZ4Cs2I.jpg" class="d-block w-100 h-[480px]" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../public/caruful/unsplash_it4Z1ykl_Z4.jpg" class="d-block w-100 h-[480px]" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../public/caruful/unsplash_ZQZrvL7DwiI.jpg" class="d-block w-100 h-[480px]" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>


  <div class="w-[1080px] mx-auto font-bold my-14">
    <div class="mb-6" v-for="(title,index) in titleStyle">
      <div :style="{borderBottom:title.border_bottom}">
        <p class="Gradient" :style="{background:title.bg}">{{ title.name }}</p>
      </div>

      <div :id="'carouselExampleControls'+index" class=" carousel slide mt-3 " data-bs-ride="carousel">
        <button class="carousel-control-prev w-fit left-[-3rem] h-[7rem] top-[35%] bg-[#00000080]" type="button" :data-bs-target="'#carouselExampleControls'+index" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <div class="carousel-inner modal-dialog">

          <div v-for="(item1) in [1,2,3]" :class="{'carousel-item active':item1===1,'carousel-item':item1!==1}">
            <div class="row">
              <div v-for="(item2) in [1,2,3,4,5]" class="card w-[13rem] mr-3">
                <img src="../../public/caruful/store_ca/unsplash_HH4WBGNyltc.jpg" class="card-img-top thisimg" alt="...">
                <div class="card-body">
                  <p class="card-text">Some quick example text to </p>
                  <h1 class="text-red-600 text-3xl my-3">$ {{ 200 }}</h1>
                  <p class="card-text">銷售量：{{ 2000 }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>  
        <button class="carousel-control-next w-fit right-[-3rem] h-[7rem] top-[35%] bg-[#00000080]" type="button" :data-bs-target="'#carouselExampleControls'+index" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.Gradient {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  line-height: 1.25rem;
  width: fit-content;

  /* background: linear-gradient(rgb(255, 80, 97), rgba(249, 249, 249, 0.999)); */
}

.thisimg{
  display: inline-block;
  transition: 1s ease-in-out;
}
.thisimg:hover{
  transform: rotateX(45deg) ;
  -webkit-transform: rotateX(45deg) ;
}

</style>