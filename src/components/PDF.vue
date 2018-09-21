<template>
<div class="pdf">
  <el-carousel trigger="click" height="100%" :autoplay="false" arrow="always" ref="carousel">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</div>
</template>
<script>
export default {
  data () {
    return {
      autoplay: false
    }
  },
  mounted () {
    window.nextHandle = this.nextHandle
    window.prevHandle = this.prevHandle
  },
  methods: {
    nextHandle () {
      this.$refs.carousel.next()
    },
    prevHandle () {
      this.$refs.carousel.prev()
    }
  }
}
</script>
<style>
.pdf{
  text-align: center;
  width: 100%;
  height: 100%;
}
div{
  width: 200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.el-carousel__arrow{
  display: none;
}
</style>
