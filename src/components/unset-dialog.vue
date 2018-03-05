<template>
  <div class="betslip-dialog">
    <transition name="el-zoom-in-bottom">
      <div class="betslip-dialog__content" v-show="isCollapse">
        <div class="betslip-dialog__content-heading">
          <h3>未结订单</h3>
        </div>
        <div class="betslip-dialog__content-body">
          <div v-if="orderList && orderList.length > 0">
            <unset-order v-for="(item, index) in orderList"  :key="index" :current="item" />
          </div>
          <div class="betslip-dialog__content-hint" v-else>
            暂无未结订单
          </div>
        </div>
        <div class="betslip-dialog__content-footer">
          <a href="#" @click="toUnset">去下注记录页面查看更多</a>
        </div>
      </div>
    </transition>
    <div class="betslip-dialog__action animated bounceInRight" :class="isCollapse ? '' : 'is-close'">
      <div class="betslip-dialog__action-left" @click="collapseClick">
        <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      </div>
      <div class="betslip-dialog__action-middle">
        <div class="betslip-action__middle-cart" @click="collapseClick">
          <i></i>
        </div>
        <div class="betslip-action__middle-caption">
          <p>共： {{orderList && orderList.length}} 组</p>
          <span>总额： ¥ {{setTotal}}</span>
        </div>
      </div>
      <div class="betslip-dialog__action-right">
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import _ from 'lodash'
import unsetOrder from '@/components/Game/unset-order'
export default {
  components: {
    unsetOrder
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setTotal () {
      return this.orderList && this.orderList.length > 0 ? _.sumBy(this.orderList, item => Number(item.money)) : 0
    }
  },
  data () {
    return {
      orderList: []
    }
  },
  methods: {
    toUnset () {
      this.$router.push({name: 'betting', query: {type: 'weijie'}})
      this.$emit('collapse')
    },
    // 请求未结
    fetchData (params) {
      api.findlotteyBill(params).then(data => {
        if (data.data && data.data.httpCode === 200) {
          this.orderList = data.data.response
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 展开 or 关闭
    collapseClick () {
      this.$emit('collapse')
      if (!this.isCollapse) {
        this.fetchData({pageNo: 1, pageSize: 10})
      }
    }
  }
}
</script>
