export default {
  created: function () {
    this.loggedin = this.$_isLoggedin()
  },
  methods: {
    $_isLoggedin () {
      return (this.$cookie.get('userId') != null)
    },
    $_logout () {
      this.$cookie.delete('userId')
      this.$cookie.delete('access_token')
      this.loggedin = false
    }
  }
}
