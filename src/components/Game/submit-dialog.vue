<template>
    <div class="betArea-dialog__content">
      <div class="betArea-dialog__heading" v-show="!isPick">
        <div class="dialog-heading__number">
          号码
        </div>
        <div class="dialog-heading__odds">
          赔率
        </div>
        <div class="dialog-heading__money">
          金额
        </div>
        <div class="dialog-heading__action">
          确认
        </div>
      </div>
      <div class="betArea-dialog__body">
        <ul class="betArea-dialog-body__list" v-if="!isPick">
          <li class="betArea-dialog-body__item" v-for="(item, index) in betAreaList" :key="index">
            <div class="dialog-body__number">
              {{item.name}}
            </div>
            <div class="dialog-body__odds">
              {{item.odds}}
            </div>
            <div class="dialog-body__money">
              <el-input size="mini" :value="item.singleMoney" type="number" @keypress.native="keypress" @input="moneyInput($event, item)" class="default-small"/>
            </div>
            <div class="dialog-body__action">
              <i @click="deleteCurrentOdds(item, index)" class="el-icon-error"></i>
            </div>
          </li>
        </ul>
        <div class="betArea-dialog-body__list" v-if="isPick" v-for="(item, index) in betAreaList" :key="index">
          <div class="betArea-dialog-body__item">
            <div class="dialog-body__pick-title">
              投注号码：
            </div>
            <div class="dialog-body__pick">
              {{item.name||item.round && item.round.toString()}}
            </div>
          </div> 
          <div class="betArea-dialog-body__item" style="margin: 10px 0">
            <div class="dialog-body__pick-title">
              投注期数：
            </div>
            <div class="dialog-body__pick">
              <span>2018004</span>
            </div>
          </div> 
          <div class="betArea-dialog-body__item">
            <div class="dialog-body__money-title">
              输入金额：
            </div>
            <div class="dialog-body__pick-money">
              <el-input size="mini" type="number" @input="inputHandle" @keypress.native="keypress" :value="doubleMoney" class="default-small"/>
            </div>
          </div> 
        </div>
      </div>
      <div class="betArea-dialog__footer">
        <div class="dialog-footer__numbers" v-if="!isPick">
          组数：{{betAreaList.length}}
        </div>
        <div class="dialog-footer__numbers" v-else>
          组数：1
        </div>
        <div class="dialog-footer__total" v-if="!isPick">
          总金额：<span style="color: #f92a08;">{{getBetTotal}}</span>元
        </div>
        <div class="dialog-footer__total" v-else>
          单注金额：<span>{{money}}</span>元
        </div>
      </div>
      <div class="betArea-dialog__actions">
        <button class="btn-inline__default dialog-actions__confirm" type="button" @click="submitBet">确认</button>
        <button class="btn-inline__default dialog-actions__cancel" type="button" @click.stop="cancel">取消</button>
      </div>
    </div>
</template>
<script>
import _ from 'lodash'
import inputMixins from '@/mixins/input'
import {mapGetters} from 'vuex'
// import {setBallBgColor, getBetConnectNumbers} from '@/utils'
export default {
  mixins: [inputMixins],
  props: {
    betAreaList: {
      type: Array,
      default: () => []
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    betTotal: {
      type: Number,
      default: 0
    },
    isPick: {
      type: Boolean,
      default: false
    },
    singleMoney: {}
  },
  data () {
    return {
      money: ''
    }
  },
  computed: {
    ...mapGetters([
      'doubleMoney'
    ]),
    getBetConnectNumbers () {
      // this.betAreaList[0] ? this.betAreaList[0].number_info.pick : 1
      // return getBetConnectNumbers(this.betAreaList.length, 3)
    },
    getBetTotal () {
      if (this.isPick) {
        if (isNaN(this.money)) {
          return 0
        }
        // return getBetConnectNumbers(this.betAreaList.length, 3) * this.money
      }
      return _.sumBy(this.betAreaList, (item) => Number(item.singleMoney))
    }
  },
  methods: {
    moneyInput (val, current) {
      this.$store.commit('receive_odds_list', {
        current,
        singleMoney: val
      })
    },
    inputHandle (val) {
      // this.money = val
      this.$store.commit('set_double_money', val)
      // this.$emit('money-change', val)
    },
    closeHandle () {
      this.$emit('close-handle')
    },
    cancel () {
      this.$emit('cancel-handle')
    },
    submitBet () {
      if (this.isPick) {
        this.$emit('submit-handle', this.doubleMoney)
      } else {
        this.$emit('submit-handle', this.betAreaList)
      }
    },
    deleteCurrentOdds (item, index) {
      this.$emit('delete-handle', index)
    },
    setBallColor (number) {
      // return setBallBgColor(number)
    }
  }
}
</script>
