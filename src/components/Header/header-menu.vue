<template>
  <ul class="header-middle__list">
    <li class="header-middle__item" v-for="(item, index) in list" :key="index">
      <a href="#"  @click.prevent="goAddress(item.path, item.query)" :class="$route.path.includes(item.path) ? 'header-middle-menu__active' : ''" :exact="item.path === '/' ? true : false">{{item.title}}</a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goAddress (path, query) {
      if (path === '/home/balanceRecord' && (!this.userInfo.sessionId || this.userInfo.guest === 0)) {
        this.$swal({
          type: 'info',
          title: '请登录正式账号操作',
          timer: 1500
        })
        return false
      }
      if (path === '/home/official') {
        window.open('http://www.1188kai.com')
        return false
      }
      if (path === '/Customer') {
        window.open('https://f88.live800.com/live800/chatClient/chatbox.jsp?companyID=724999&configID=139963&jid=1482053496&s=1')
        return false
      }
      if (path === '/register') {
        this.$emit('regist')
        return false
      }
      if (path === '/home/games') {
        if (this.$route.path.includes(path)) {
          return false
        }
        // this.$router.back()
        this.$router.push({path, query: {play: '17'}})
      } else {
        if (query) {
          this.$router.push({path, query})
        } else {
          this.$router.push(path)
        }
      }
    }
  },
  watch: {

  }
}
</script>
