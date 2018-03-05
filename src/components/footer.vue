<template>
  <footer class="cp-footer">
    <span v-if='isshow'>版权所有© 2017 彩投彩票，保留所有权利</span>
    <span v-if='!isshow' @click='$router.push({name: "notify"})' style='cursor:pointer;'>
      {{msg}} 
    </span>
  </footer>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      msg: '暂无公告',
      isshow: true
    }
  },
  created () {
    this.msgs()
  },
  mounted () {
    setInterval(this.set, 5000)
    setInterval(this.msgs, 60000)
  },
  methods: {
    set () {
      this.isshow = !this.isshow
    },
    msgs () {
      let params = {
        type: 0
      }
      api.newmessage(params).then(res => {
        if (res.data.response) {
          this.msg = res.data.response[0].content.substring(1, 93) + '...'
        }
      })
    }
  }
}
</script>

