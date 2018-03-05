<template>
    <div class="money-recharge__bank">
        <form ref="form" class="money-withdrawal__form" @submit.stop.prevent="submit">
          <div class="money-withdrawal">
              <div class="money-withdrawal__addbank">
                <div class="money-withdrawal__addbank-title" v-if="!bankInfo.id">
                  <el-button icon="el-icon-circle-plus" @click="$router.push({name: 'bank', query: {type: 'add'}})">添加银行账户</el-button>
                </div>
                 <!--  <el-select v-model="currentCard" size="small" style="width: 100%" v-if="banksData.length > 0">
                      <el-option
                          v-for="(item, index) in banksData"
                          :label="item.label | formatBanks"
                          :value="item.card_id" :key="index">
                      </el-option>
                  </el-select> -->
                <div class="money-withdrawal__update" v-else>
                  <div class="money-withrawal__update-text">
                    <a href="#" @click.prevent="$router.push({name: 'bank', query: {type: 'edit'}})">
                      <i class="el-icon-edit-outline"></i>
                      修改银行卡账户信息
                    </a>
                  </div>
                  <div class="money-withrawal__update-content">
                    <div class="money-withrawal__update-bank">
                      <img :src="bankInfo.bankname | setImg(bankList)" alt="">
                      <span>{{bankInfo.bankname}}</span>
                      <p>{{bankInfo.bankaccount | formatBanks}}</p>
                    </div>
                  </div>
                </div>
              </div>

          </div>
          <div class="money-withdrawal__input">
            <h4>请输入充值金额</h4>
            <bank-money-input type="number" v-model="currentMoney" @clear="clear"/>
            <bank-money-list :activeMoneyId="activeMoney" :list="moneyList" @active-change="moneyTypeChange" type="money"/>
              <div class="money-withdrawal__pwd">
                <el-row style="line-height: 32px">
                  <el-col :span="2"><span>提现密码</span></el-col>
                  <el-col :span="4">
                    <el-input size="small" v-model="passwd" type="password" @keypress.native="keypress" :maxlength="maxlength"></el-input>
                  </el-col>
                </el-row>
              </div>
          </div>
          <div class="money-withdrawal__btn">
              <button class="btn-inline__default betArea-btnGroup__submit" type="button" @click="submit">确定</button>
              <button class="btn-inline__default betArea-btnGroup__reset" type="button" @click="reset">重置</button>
          </div>
        </form>
    </div>
</template>
<script>
  import api from '@/api'
  import { bankList, moneyList } from '@/config/money.conf'
  import bankMoneyInput from '@/components/MoneyMan/bank-money-input'
  import bankMoneyList from '@/components/MoneyMan/bank-money-list'
  import {mapGetters} from 'vuex'
  import inputMixins from '@/mixins/input'

  export default {
    mixins: [inputMixins],
    components: {
      bankMoneyInput,
      bankMoneyList
    },
    data () {
      return {
        maxlength: 4,
        currentMoney: '',
        passwd: '',
        currentCard: '',
        activeMoney: -1,
        bankList,
        moneyList,
        status: 1
      }
    },
    computed: {
      ...mapGetters([
        'bankInfo'
      ])
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
      reset () {
        this.currentMoney = '0'
        setTimeout(() => {
          this.currentMoney = ''
        }, 1)
        this.activeMoney = -1
        this.passwd = ''
      },
      check () {
        if (!this.bankInfo.id) {
          return '银行卡不能为空'
        }
        if (this.currentMoney <= 0) {
          return '金额不能为空'
        }
        if (!this.passwd) {
          return '提现密码不能为空'
        }
        return true
      },
      submit () {
        if (this.check() === true) {
          const loading = this.$loading({
            lock: true
          })
          api.submitWithdraw({
            bankCardNumbers: this.bankInfo.bankaccount,
            payPassword: this.passwd,
            withdrawalAmount: this.currentMoney
          }).then(data => {
            loading.close()
            if (data.data) {
              if (data.data.httpCode === 530) {
                this.$swal({
                  type: 'success',
                  title: '提现成功',
                  timer: 1500
                })
                this.reset()
              } else if (data.data.httpCode === 2007) {
                this.$swal({
                  type: 'error',
                  title: '支付密码错误',
                  timer: 1500
                })
              } else if (data.data.httpCode === 517) {
                this.$swal({
                  type: 'error',
                  title: '余额不足',
                  timer: 1500
                })
              }
            }
          }).catch(err => {
            loading.close()
            console.error(err)
          })
        } else {
          this.$swal({
            type: 'error',
            title: this.check(),
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    },
    filters: {
      formatBanks (val) {
        // 卡号
        const cardNumber = val.trim().replace(/[^0-9]/g, '')
        const arr = val.split(cardNumber)

        let reg = /^(\d{4})(\d*)(\d{4})$/
        const newCard = cardNumber.replace(reg, function (a, b, c, d) {
          return b + c.replace(/\d/g, '****') + d
        })
        arr.splice(1, 0, newCard)
        return arr.join('')
      },
      setImg (val, bankList) {
        const current = bankList.find(item => item.title === val)
        return current ? current.img : ''
      }
    },
    created () {
      this.$store.dispatch('fetchBankInfo')
    }
  }
</script>
