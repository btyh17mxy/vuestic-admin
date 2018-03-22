<template>
  <div class="flood-fill">
    <button class="btn btn-primary" @click="loadImg">LoadImage</button>
    <button class="btn btn-primary" @click="loadBlob">tryBlob</button>
    <div class="row">
      <div class="col-lg-12" style="background: red;min-height: 1100px">
        <canvas ref="imgCanvas" width="1024px" height="1024px" style="position: absolute; left: 0; right: 0; bottom: 0; top: 0;z-index:99999;"></canvas>
        <canvas ref="fillCanvas" width="1024px" height="1024px" style="position: absolute; left: 0; right: 0; bottom: 0; top: 0;z-index:88888"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  import CCFill from './fill'
  export default {
    name: 'flood-fill',
    methods: {
      data () {
        return {
          ctx: null,
          imageData: null,
          ccFill: null
        }
      },
      loadImg () {
        this.$http.get(
          'https://olob4plt2.qnssl.com/dropzoneupload/696c52375af12f9eaebdbae33e36fcdb.json'
        ).then(
          (resp) => {
            console.log(resp.data[1])
            this.ccFill.setImg(
              'http://cw-lens.dailyinnovation.biz/imageView/1024/1024/png/name:1494228201000/2cf22c1d1f9430d69035c7e323a54846.png',
              resp.data
            )
          },
          (resp) => {
            this.$toastr.error('error fetch regionData')
          }
        )
      },
      loadBlob () {
        fetch('http://cw-lens.dailyinnovation.biz/region/name:1494228201000/3341b533610adf5141f1b980f4554384.png').then(
          (resp) => {
            console.log(resp)
            return resp.blob()
          }
        ).then(
          (blob) => {
            console.log(blob)
            var fr = new FileReader()
            fr.onload = () => {
              console.log(fr.result)
            }
            fr.readAsArrayBuffer(blob)
          }
        )
      }
    },
    mounted () {
      this.ccFill = new CCFill(
        this.$refs.imgCanvas,
        this.$refs.fillCanvas
      )
      this.loadImg()
      this.$refs.imgCanvas.addEventListener(
        'click',
        (evt) => {
          this.$toastr.clear()
          // var success = this.ccFill.fillSection(evt.offsetX, evt.offsetY)
          var success = this.ccFill.fillRegion(evt.offsetX, evt.offsetY)
          if (!success) {
            this.$toastr.error('is line')
          }
          console.log('done')
        }
      )
    }
  }
</script>

