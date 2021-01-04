export default {
  methods: {
    handleSearch () {
      this.$emit('handle-search', this.search)
    },
    handleReset (_name) {
      this.$refs[_name].resetFields()
      this.$nextTick().then(() => {
        this.$emit('handle-search', this.search)
      })
    }
  }
}
