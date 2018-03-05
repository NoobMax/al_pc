<template>
  <type-list :paytype-list="paymentList" @active-change="activeChange" :activeId="activeId"
      :payTyprImg="payType"/>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {payType} from '@/config/money.conf'
  import typeList from '@/components/MoneyMan/money-paytype-list'
  export default {
    components: {
      typeList
    },
    computed: {
      ...mapGetters([
        'paymentList'
      ])
    },
    methods: {
      activeChange (item) {
        if (item.online) {
          this.$router.push({name: 'recharge_banks', params: {id: item.id}})
        } else {
          this.$router.push({name: 'recharge_pay_offline', params: {id: item.id}})
        }
      }
    },
    data () {
      return {
        activeId: 0,
        payType
      }
    },
    created () {
      if (this.$store.getters.paymentList.length === 0) {
        this.$store.dispatch('fetchPaymentList', {pageNo: 1, pageSize: -1})
      }
    }
  }
</script>