<template>
  <div class="test-resource">
    <h1>test resource</h1>
  </div>
</template>

<script>
  export default {
    name: 'ad-table',
    methods: {
      fetchData () {
        this.$http.get(
          'https://postman-echo.com/status/200'
        ).then(
          (resp) => {
            if (resp.data.status.code === 0) {
              this.$toastr.success('success')
            }
          },
          (resp) => {
            this.$toastr.error('error')
          }
        )
      }
    },
    mounted () {
      this.fetchData()
    }
  }
</script>
