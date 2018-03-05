<template>
  <div class="money-banks__transform">
     <div class="money-banks__content">
        <div class="money-banks__heading">
          <h4>付款方信息</h4>
        </div>
       <div class="money-banks__form">
         <div class="money-banks__form-item">
          <span>转换金额：</span>
          <bank-money-input type="number" v-model="currentMoney" @clear="clear" :show-hint="false" />
          <bank-money-list :activeMoneyId="activeMoney" :list="list" @active-change="moneyTypeChange"
          type="money"/>
         </div>
        <div class="money-banks__form-item">
          <span>转换方式：</span>
          <div class="money-transfrom__radio">
            <el-radio v-model="radio" label="1">AG转彩票</el-radio>
            <el-radio v-model="radio" label="2">彩票转AG</el-radio>
          </div>
        </div>
       </div>
       <div class="money-withdrawal__btn">
              <button class="btn-inline__default betArea-btnGroup__submit" type="button" @click="submit">确定</button>
              <button class="btn-inline__default betArea-btnGroup__reset" type="button" @click="reset">重置</button>
      </div>
    </div>
  </div>
</template>
<script>
import bankMoneyInput from '@/components/MoneyMan/bank-money-input'
import bankMoneyList from '@/components/MoneyMan/bank-money-list'
import { transfromMoneyList } from '@/config/money.conf'
export default {
  components: {
    bankMoneyInput,
    bankMoneyList
  },
  data () {
    return {
      currentMoney: '',
      activeMoney: -1,
      list: transfromMoneyList,
      radio: '1'
    }
  },
  methods: {
    clear () {
      this.currentMoney = '0'
      setTimeout(() => {
        this.currentMoney = ''
      }, 1)
      this.activeMoney = -1
    },
    moneyTypeChange (item, index) {
      this.activeMoney = index
      this.currentMoney = item.money
    },
    submit () {
      this.$swal({
        type: 'error',
        title: '接口未定义',
        timer: 1500
      })
    },
    reset () {
      this.clear()
      this.radio = '1'
    }
  }
}
</script>

