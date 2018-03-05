<template>
  <div class="cp-home__container animated fadeIn">
    <div class="notify-wrapper">
       <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="系统公告" name="notify">
            <div class="notify-wrapper__content">
              <ul>
                <notify-item v-for="(item, index) in notifyList" :current="item" :key="index" />
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="优惠活动" name="activity">
          </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import notifyItem from '@/components/notify-list'
import api from '@/api'
export default {
  components: {
    notifyItem
  },
  data () {
    return {
      notifyList: [],
      activeName: 'notify'
    }
  },
  methods: {
    handleClick (item) {
      // console.log(item)
    },
    fetchData (params) {
      api.getNotifyList(params).then(data => {
        if (data.data && data.data.httpCode === 200) {
          this.notifyList = data.data.response
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.fetchData({pageNo: 1, pageSize: -1})
  }
}
</script>

