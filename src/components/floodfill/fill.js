export default class CCFill {
  constructor (canvas, fillCanvas) {
    this.canvas = canvas
    this.fillCanvas = fillCanvas
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ctx = this.canvas.getContext('2d')
    this.fillCtx = this.fillCanvas.getContext('2d')
    this.imageData = null
    this.fillImageData = null
    this.regionImageData = null
    this.line = 100
    this.empty = 0
    console.log('init')
  }

  setImg (imgUrl, regionData) {
    this.regionData = regionData
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.fillCtx.clearRect(0, 0, this.width, this.height)
    this.fillCtx.fillStyle = 'rgba(0, 0, 0, 0)'
    this.fillCtx.fillRect(0, 0, this.width, this.height)
    this.fillImageData = this.fillCtx.getImageData(0, 0, this.width, this.height)
    var img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0)
      this.imageData = this.ctx.getImageData(
        0,
        0,
        this.width,
        this.height
      )
      console.log('img load')
    }
    img.src = imgUrl
    console.log('setImg')
  }

  fillRegion (clickX, clickY) {
    console.log(clickX, clickY)
    var regionID = this.getRegion(clickX, clickY)
    if (regionID === 1) {
      return false
    }
    console.log(regionID)
    this.setPixelByRegionIndex(this.getSameRegion(regionID))
    return true
  }

  fillSection (clickX, clickY) {
    var clickColor = this.getColor(clickX, clickY)
    if (clickColor === this.line) {
      return false
    }
    var fillPixels
    fillPixels = [[clickX, clickY]]
    while (fillPixels.length > 0) {
      var pixel, pX, pY, spanLeft, spanRight
      pixel = fillPixels.pop()
      pX = pixel[0]
      pY = pixel[1]
      while ((pY >= 0) && (this.getColor(pX, pY) < this.line)) {
        pY -= 1
      }
      pY += 1
      spanLeft = false
      spanRight = false
      while ((pY < this.height) && (this.getColor(pX, pY) < this.line)) {
        this.setPixel(pX, pY)
        if (pX > 0) {
          var cLeft = this.getColor(pX - 1, pY)
          if (!spanLeft && cLeft < this.line) {
            fillPixels.push([pX - 1, pY])
            spanLeft = true
          } else if (spanLeft && cLeft >= this.Line) {
            spanLeft = false
          }
        }
        if (pX < (this.width - 1)) {
          var cRight = this.getColor(pX + 1, pY)
          if ((!spanRight) && (cRight < this.line)) {
            fillPixels.push([pX + 1, pY])
            spanRight = true
          } else if (spanRight && (cRight >= this.line)) {
            spanRight = false
          }
        }
        pY += 1
      }
    }
    this.ctx.putImageData(this.imageData, 0, 0, 0, 0, this.width, this.height)
    return true
  }

  getColor (x, y) {
    var c = this.imageData.data[4 * (y * this.width + x) + 3]
    return c
  }

  getRegion (x, y) {
    return this.regionData[(y * this.width + x)]
  }

  getSameRegion (regionID) {
    var regionIndexs = []
    var i = -1
    while ((i = this.regionData.indexOf(regionID, i + 1)) !== -1) {
      regionIndexs.push(i)
    }
    console.log(regionIndexs)
    return regionIndexs
  }

  setPixel (x, y) {
    // console.log('set', x, y)
    this.fillImageData.data[4 * (y * this.width + x)] = 0
    this.fillImageData.data[4 * (y * this.width + x) + 1] = 255
    this.fillImageData.data[4 * (y * this.width + x) + 2] = 0
    this.fillImageData.data[4 * (y * this.width + x) + 3] = 255
  }

  setPixelByRegionIndex (regionIndexList) {
    while (regionIndexList.length > 0) {
      var x, y
      var regionIndex = regionIndexList.pop()
      y = Math.floor(regionIndex / this.width)
      x = regionIndex % this.width
      this.setPixel(x, y)
    }
    this.fillCtx.putImageData(this.fillImageData, 0, 0, 0, 0, this.width, this.height)
  }
}
