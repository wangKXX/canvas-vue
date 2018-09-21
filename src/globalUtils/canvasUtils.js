// 直线
export function drawLine (x, y, linex, liney, canvas, drawingSurfacsImageData) {
  setCanvas(canvas)
  restoreDrawingSurface(canvas, drawingSurfacsImageData)
  let context = canvas.getContext('2d')
  context.beginPath()
  context.moveTo(+x + 0.5, +y + 0.5)
  context.lineTo(+linex + 0.5, +liney + 0.5)
  context.lineWidth = 2
  context.strokeStyle = '#000000'
  context.stroke()
}

// 保存canvas的数据
export function saveDrawingSurface (canvas) {
  var context = canvas.getContext('2d')
  return context.getImageData(0, 0, canvas.width, canvas.height)
}

// 渲染canvas的数据
export function restoreDrawingSurface (canvas, drawingSurfacsImageData) {
  var context = canvas.getContext('2d')
  context.putImageData(drawingSurfacsImageData,
    0, 0, 0, 0, canvas.width, canvas.height
  )
}

// 自由画线
export function freeDraw (x, y, linex, liney, canvas) {
  let context = canvas.getContext('2d')
  context.beginPath()
  context.moveTo(+x + 0.5, +y + 0.5)
  context.lineTo(+linex + 0.5, +liney + 0.5)
  context.lineWidth = 2
  context.strokeStyle = '#000000'
  context.stroke()
}

// 矩形
export function rectDraw (x, y, w, h, canvas, drawingSurfacsImageData) {
  setCanvas(canvas)
  restoreDrawingSurface(canvas, drawingSurfacsImageData)
  let ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#0000000'
  ctx.stroke()
}

// 圆
export function crtDraw (x, y, r, c, drawingSurfacsImageData) {
  setCanvas(c)
  restoreDrawingSurface(c, drawingSurfacsImageData)
  let ctx = c.getContext('2d')
  ctx.beginPath()
  r = Math.abs(r)
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#000000'
  ctx.stroke()
}

// 橡皮
export function gumdraw (x, y, linex, liney, canvas) {
  let context = canvas.getContext('2d')
  context.beginPath()
  context.clearRect(linex, liney, 50, 50)
  context.stroke()
}

export function setCanvas (canvas) {
  let width = canvas.offsetWidth
  let height = canvas.offsetHeight
  canvas.width = width
  canvas.height = height
}
