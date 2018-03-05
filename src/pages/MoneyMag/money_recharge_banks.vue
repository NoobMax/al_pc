<template>
   <div class="money-recharge__current">
      <p style="color: #666; line-height: 40px;">请输入充值金额</p>
      <bank-money-input type="number" v-model="currentMoney" @clear="clear" />
      <bank-money-list :activeMoneyId="moneyActiveId" :list="moneyList" @active-change="moneyTypeChange"
                                 type="money"/>
      <div class="betArea-action__btnGroup" style="text-align: center">
        <button class="btn-inline__default betArea-btnGroup__submit" type="button" @click="submit">提交</button>
        <button class="btn-inline__default betArea-btnGroup__reset" @click="clear">重置</button>
      </div>
      </div>
</template>
<script>
import { moneyList } from '@/config/money.conf'
import {mapGetters} from 'vuex'
import bankMoneyInput from '@/components/MoneyMan/bank-money-input'
import bankMoneyList from '@/components/MoneyMan/bank-money-list'
import api from '@/api'
export default {
  components: {
    bankMoneyInput,
    bankMoneyList
  },
  computed: {
    ...mapGetters([
      'paymentList'
    ])
  },
  data () {
    return {
      moneyActiveId: -1,
      moneyList,
      currentMoney: ''
    }
  },
  methods: {
    submit () {
      if (!this.currentMoney) {
        this.$swal({
          position: 'center',
          type: 'error',
          title: '金额不能为空',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        const params = this.filterSubmitInfo(this.currentMoney)
        if (params) {
          api.submitOnlinePay(params).then(data => {
            if (data.data && data.data.httpCode === 200) {
              window.open(data.data.response[0].url)
            }
          })
        } else {
          this.$swal({
            position: 'center',
            type: 'error',
            title: '网络异常',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    },
    filterSubmitInfo (amount) {
      const {id} = this.$route.params
      const current = this.paymentList.find(item => item.id === Number(id) && item.online)
      if (current) {
        return Object.assign({}, current.channel, {amount})
      }
      return ''
    },
    // 清楚金额
    clear () {
      this.currentMoney = '0'
      setTimeout(() => {
        this.currentMoney = ''
      }, 1)
      this.moneyActiveId = -1
    },
    moneyTypeChange (item, index) {
      this.moneyActiveId = index
      this.currentMoney = item.money
    }
  },
  created () {
    if (this.$store.getters.paymentList.length === 0) {
      this.$store.dispatch('fetchPaymentList', {pageNo: 1, pageSize: -1})
    }
  }
}
</script>
