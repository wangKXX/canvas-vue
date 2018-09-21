<template>
  <div class="hello">
    <Tab ref="tab" @changeActive='changeActive'/>
    <div class="canvas" v-for="(item, key) in tabArr" :key="key" :id="item.id" v-show="item.id === selectCard">
      <canvas ref='canvas' @mousedown="getStartPoint" @mousemove="startDraw" @mouseup="chanageState" :key='key'></canvas>
      <iframe src="/#/pdf" frameborder="0" ref="iframe"></iframe>
    </div>
    <mean/>
  </div>
</template>

<script>
import Mean from './Mean'
import Tab from './table'
import {drawLine, saveDrawingSurface, freeDraw, rectDraw, crtDraw, gumdraw} from 'globalUtils/canvasUtils.js'
import base from 'globalUtils/base'
export default {
  name: 'Main',
  components: {
    Mean, Tab
  },
  data () {
    return {
      x: 0,
      y: 0,
      canDraw: false,
      drawingSurfacsImageData: null,
      tabCount: 1,
      tabArr: [{
        id: 1,
        isdynamic: true
      }],
      selectCard: 1
    }
  },

  computed: {
    selectType () {
      return this.$store.state.selectType
    }
  },

  mounted () {
    this.setCanvasWidthHeight()
    base.on('TAB_CHANGE', (prams) => {
      console.log('我触发了')
      this.selectCard = Number(prams)
    })
    window.onresize = () => {
      console.log('resize')
      // this.setCanvasWidthHeight()
    }
  },
  watch: {
    selectType (newval, oldval) {
      let iframe = this.$refs.iframe[this.selectCard - 1]
      newval = Number(newval)
      if (newval === 2) {
        let canvas = this.$refs.canvas[this.selectCard - 1]
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        this.$store.commit('setSelectType', '1')
      } else if (newval === 6) {
        iframe.contentWindow.nextHandle()
        this.$store.commit('setSelectType', '1')
      } else if (newval === 7) {
        iframe.contentWindow.prevHandle()
        this.$store.commit('setSelectType', '1')
      } else if (newval === 8) {
        this.$refs.tab.addTab(this.tabCount + 1)
        this.tabCount = this.tabCount + 1
        this.addCanvas(this.tabCount)
        this.selectCard = this.tabCount
        this.$store.commit('setSelectType', '1')
      }
    }
  },

  methods: {
    setCanvasWidthHeight () {
      let canvas = this.$refs.canvas[this.selectCard - 1]
      let width = canvas.offsetWidth
      let height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    },
    addCanvas (id) {
      this.tabArr.push({
        id: id,
        isdynamic: true
      })
      this.$nextTick(() => {
        let canvas = this.$refs.canvas[this.selectCard - 1]
        let width = canvas.offsetWidth
        let height = canvas.offsetHeight
        canvas.width = width
        canvas.height = height
      })
    },
    getStartPoint (e) {
      let selectType = +(this.$store.state.selectType)
      let canvas = this.$refs.canvas[this.selectCard - 1]
      var location = this.getLocation(e.clientX, e.clientY)
      this.x = location.x
      this.y = location.y
      this.canDraw = true
      if (selectType === 0) {
        this.drawingSurfacsImageData = saveDrawingSurface(canvas)
      } else if (selectType === 4) {
        this.drawingSurfacsImageData = saveDrawingSurface(canvas)
      } else if (selectType === 3) {
        this.drawingSurfacsImageData = saveDrawingSurface(canvas)
      }
    },

    getLocation (x, y) {
      let canvas = this.$refs.canvas[this.selectCard - 1]
      var bbox = canvas.getBoundingClientRect()
      return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height)
      }
    },

    startDraw (e) {
      if (!this.canDraw) {
        return false
      }
      let canvas = this.$refs.canvas[this.selectCard - 1]
      var location = this.getLocation(e.clientX, e.clientY)
      let selectType = +(this.$store.state.selectType)
      if (selectType === 0) { // 直线
        drawLine(this.x, this.y, location.x, location.y, canvas, this.drawingSurfacsImageData)
      } else if (selectType === 1) { // 自由线
        freeDraw(this.x, this.y, location.x, location.y, canvas)
        this.x = location.x
        this.y = location.y
      } else if (selectType === 4) { // 矩形
        let x = this.x
        let y = this.y
        let w = location.x - x
        let h = location.y - y
        rectDraw(x, y, w, h, canvas, this.drawingSurfacsImageData)
      } else if (selectType === 3) { // 圆形
        let x = this.x + (location.x - this.x) / 2
        let y = this.y + (location.y - this.y) / 2
        let r = (location.y - this.y) / 2
        crtDraw(x, y, r, canvas, this.drawingSurfacsImageData)
      } else if (selectType === 5) {
        gumdraw(this.x, this.y, location.x, location.y, canvas)
        this.x = location.x
        this.y = location.y
      }
    },

    chanageState (e) {
      let selectType = +(this.$store.state.selectType)
      let canvas = this.$refs.canvas[this.selectCard - 1]
      var location = this.getLocation(e.clientX, e.clientY)
      if (selectType === 0) {
        drawLine(this.x, this.y, location.x, location.y, canvas, this.drawingSurfacsImageData)
      } else if (selectType === 4) {
        let x = this.x
        let y = this.y
        let w = location.x - x
        let h = location.y - y
        rectDraw(x, y, w, h, canvas, this.drawingSurfacsImageData)
      } else if (selectType === 3) {
        let x = this.x + (location.x - this.x) / 2
        let y = this.y + (location.y - this.y) / 2
        let r = (location.y - this.y) / 2
        crtDraw(x, y, r, canvas, this.drawingSurfacsImageData)
      }
      this.canDraw = false
      this.x = 0
      this.y = 0
    },

    changeActive (card) {
      this.selectCard = +card
      this.tabCount = this.tabArr.length
      console.log(this.tabCount)
    }
  }
}
</script>
<style scoped>
.hello{
  width: 100%;
  height: 100%;
  position:relative;
}
.canvas{
  overflow: hidden;
  height: 100%;
  /*padding-left: 100px;*/
  box-sizing: border-box;
  padding-top: 42px;
}
canvas{
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 5px solid transparent;
  box-sizing: border-box;
  /* border-image: url(../assets/shujia1.png) 20 20 round; */
}
iframe{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding-top: 42px;
}
</style>
