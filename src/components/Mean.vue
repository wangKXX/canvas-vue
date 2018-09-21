<template>
  <div :class="[UpDown, 'mean']">
      <ul>
        <li @click="handleClick" type='8'><el-button type="primary" class="btn-box">添加</el-button></li>
        <li @click="handleClick" type='0'><el-button type="primary" class="btn-box">直线</el-button></li>
        <li @click="handleClick" type='1'><el-button type="primary" class="btn-box">铅笔</el-button></li>
        <li @click="handleClick" type='3'><el-button type="primary" class="btn-box">圆形</el-button></li>
        <li @click="handleClick" type='4'><el-button type="primary" class="btn-box">矩形</el-button></li>
        <li @click="handleClick" type='5'><el-button type="primary" class="btn-box">橡皮</el-button></li>
        <li @click="handleClick" type='2'><el-button type="primary" class="btn-box">清除</el-button></li>
        <li @click="handleClick" type='6'><el-button type="primary" class="btn-box">向下</el-button></li>
        <li @click="handleClick" type='7'><el-button type="primary" class="btn-box">向上</el-button></li>
      </ul>
      <div :class="[switchIco, 'switch']" @click="MeanUpDown"></div>
    </div>
</template>

<script>
export default {
  name: 'Mean',
  data () {
    return {
      switchIco: 'el-icon-arrow-left',
      UpDown: "up"
    }
  },
  methods: {
    handleClick (e) {
      let rmt = e.currentTarget.type
      this.$store.commit('setSelectType', rmt)
    },
    MeanUpDown () {
      if(this.switchIco === 'el-icon-arrow-left') {
        this.switchIco = 'el-icon-arrow-right'
        this.UpDown = 'down'
      } else {
        this.switchIco = 'el-icon-arrow-left'
        this.UpDown = 'up'
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.mean{
  position: fixed;
  top: 50%;
  margin-top: -250px;
  width: 100px;
  height: 500px;
  box-sizing: border-box;
  padding-top: 10px;
  box-shadow: 1px 0px 8px #409EFF;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  transition: all .6s;
}
.up{
  left: 0;
}
.down{
  left: -100px;
}
ul,li{
  list-style: none;
  margin: 0;
  padding: 0;
}
li{
  padding: 5px 0;
}
li:first-child{
  padding-top: 10px
}
.switch{
  width: 25px;
  height: 50px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  font-size: 25px;
  color: #000;
  position: absolute;
  top: 50%;
  margin-top:-25px;
  left: 100px;
  z-index: 1;
  background-color: #409EFF;
  box-shadow: 1px 0px 8px #409EFF;
  text-align: center;
  line-height: 50px;
  color: #fff;
  cursor: pointer;
}
.btn-box{
  box-shadow: 1px 0px 5px #fff;
}
</style>
