<template>
   <div class="money-wrapper__recharge">
    <div class="money-wrapper__steps">
        <el-steps :active="activeStep" finish-status="success">
            <el-step title="选择充值/转款"></el-step>
            <el-step title="选择银行/金额"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
    </div>
    <div class="money-sub-title">
        <img :src="img" alt="">
        <span>{{title}}</span>
    </div>
    <router-view></router-view>
   </div>
</template>
<script>
export default {
  data () {
    return {
      activeStep: 0,
      img: ''
    }
  },
  watch: {
    $route (route) {
      this.activeStep = route.meta.step
      this.title = this.getTitle(Number(this.$route.params.id), this.$route.name)
    }
  },
  methods: {
    getTitle (id, name) {
      if (name === 'recharge_banks') {
        switch (id) {
          case 1:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-bank.png')
            return '网银 在线支付'
          case 2:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-alipay.png')
            return '支付宝在线'
          case 3:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-wechat.png')
            return '微信在线'
          case 4:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-cai.png')
            return '财付通在线'
          default:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-paymethods.png')
            return '充值方式'
        }
      } else {
        switch (id) {
          case 4:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-alipay.png')
            return '支付宝线下'
          case 5:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-bank.png')
            return '线下银行'
          case 6:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-wechat.png')
            return '微信线下'
          case 7:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-wechat.png')
            return '财付通线下'
          default:
            this.img = this.$getPublicImg('/img/pc/static/images/common/icon/ico-my-paymethods.png')
            return '充值方式'
        }
      }
    }
  },
  created () {
    this.title = this.getTitle(Number(this.$route.params.id))
    this.activeStep = this.$route.meta.step || 0
  }
}
</script>

