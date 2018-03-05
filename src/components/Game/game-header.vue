<template>
  <div class="game-header">
    <div class="game-header__left">
      <div class="game-header__left-image">
        <i :class="setImgClass"></i>
      </div>
      <div class="game-header__left-currentRound">
        <p>{{lotteryInfo.next && lotteryInfo.next.round}}期</p>
        <span>{{setLotteryTitle}}</span>
      </div>
      <div class="game-header__left-timer">
        <div class="game-header__timer-close" v-if="closeEndTime > 0 && lotteryInfo.next && lotteryInfo.next.isClose === 0">
          <div class="game-close__text">封</div>
          <div class="game-close__hours" v-if="Number(setCloseHours)">{{setCloseHours}}</div>
          <span class="game-close__hours" v-if="Number(setCloseHours)">:</span>
          <div class="game-close__minute">{{setCloseMinute}}</div>
          <span class="game-close__minute">:</span>
          <div class="game-close__second">{{setCloseScond}}</div>
        </div>
        <div class="game-header__text-close" v-else>
          <div class="game-close__text">已</div>
          <div class="game-close__hours">封</div>
          <div class="game-close__minute">盘</div>
        </div>
        <div class="game-header__timer-lottery">
          <span>开奖时间：</span>
          <span v-if="Number(setHours)">{{setHours}}</span>
          <span v-if="Number(setHours)">:</span>
          <span>{{setMinute}}</span>
          <span>:</span>
          <span>{{setScond}}</span>
        </div>
      </div>
    </div>
    <div class="game-header__middle">
      <div class="game-header__middle-prevRound">
        <p>{{lotteryInfo.last && lotteryInfo.last.round}}期</p>
        <a href="#" @click.prevent="openOfficial">> 官方开奖</a>
        <router-link :to="{name: 'history', query: {id: $route.meta.name, page: 1}}">> 开奖走势</router-link>
      </div>
      <div class="game-header__middle-numbers">
        <div class="lottery-header-middle__round">
          <div v-for="(item, index) in lotteryInfo.last && lotteryInfo.last.number" :key="index" class="lottery-middle__rounds">
              <div class=" cp-client ball-default"  :class="setBallClass(item)">{{item | formatNumber}}</div>
              <span v-show="$route.meta.id === 7 && (index == 5 )">+</span>
              <span v-show="$route.meta.id === 3 && (lotteryInfo.last.number.length > index+1 )">+</span>
          </div>
          <div class="lottery-eq" v-if="$route.meta.id === 3">
            <span>=</span>
            <div class="animated bounceIn cp-client ball-default is-large" :class="seteggclass">{{setNumber}}</div>
          </div>
        </div>
        <div class="lottery-header-middle__message">
          <div class="header-middle__message-left">
            <span>{{setLotteryFirst}}</span>
            <div class="header-message__left-numbers">
              <div class="header-message__number" v-for="i in lotteryInfo.last && lotteryInfo.last.totalScore">{{i}}</div>
            </div>
          </div>
          <div class="header-middle__message-middle" v-show="setLotterySecond">
            <span>{{setLotterySecond}}</span>
            <div class="header-message__middle-numbers">
              <div class="header-message__number" v-for="i in setMantissa">{{i}}</div>
            </div>
          </div>
          <div class="header-middle__message-right" v-show="setLotteryEnd">
            <span>{{setLotteryEnd}}</span>
            <div class="header-message__right-numbers">
              <div class="header-message__number" v-for="i in lotteryInfo.last && lotteryInfo.last.special">{{i}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-header__right">
      <div class="game-header__right-sound">

      </div>
      <div class="game-header__right-ten" @click="open">
        <div>近十期开奖</div>
      </div>
    </div>
    <el-dialog title="近十期开奖" :visible="visible"  @close="close">   
      <resultArea
      :skeleton="lotterySkeleton"
      :type="true"
      :results="lotteryResult">
      </resultArea>      
    </el-dialog>    
  </div>
</template>
<script>
import resultArea from '@/pages/History/result-area'
import lotterySource from '@/config/history.conf'
import api from '@/api'
import _ from 'lodash'
import { setBallColor } from '@/utils'
export default {
  components: {
    resultArea
  },
  props: {
    lotteryInfo: {
      type: Object,
      default: () => {}
    },
    endTime: {
      type: Number,
      default: 0
    },
    closeEndTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      animateName: 'animated bounceIn',
      visible: false,
      lotterySource,
      lotteryResult: {}
    }
  },
  beforeRouteUpdate (to, from, next) {
    next(vm => {
    // 通过 `vm` 访问组件实例
      vm.animateName = ''
    })
  },
  computed: {
    setMantissa () {
      const {lotteryInfo} = this
      if (lotteryInfo.last) {
        return lotteryInfo.last.mantissa || lotteryInfo.last.special
      }
      return []
    },
    lotterySkeleton: function () {
      if (this.lotterySource) {
        return this.lotterySource[this.$route.meta.name]
      }
      return {}
    },
    // 总和
    setNumber () {
      const {lotteryInfo} = this
      if (lotteryInfo.last) {
        return _.sumBy(lotteryInfo.last.number, item => Number(item))
      }
      return '0'
    },
    seteggclass () {
      return `setegg_${this.setNumber}`
    },
    setLotteryTitle () {
      return this.getTitle().title
    },
    setImgClass () {
      return this.getTitle().className
    },
    // 设置封盘小时
    setCloseHours () {
      const {closeEndTime} = this
      return this.formatTime(closeEndTime).hours
    },
    // 设置封盘分钟
    setCloseMinute () {
      const {closeEndTime} = this
      return this.formatTime(closeEndTime).minute
    },
    // 设置封盘秒数
    setCloseScond () {
      const {closeEndTime} = this
      return this.formatTime(closeEndTime).second
    },
    // 设置小时
    setHours () {
      const {endTime} = this
      return this.formatTime(endTime).hours
    },
    // 设置分钟
    setMinute () {
      const {endTime} = this
      return this.formatTime(endTime).minute
    },
    // 设置秒数
    setScond () {
      const {endTime} = this
      return this.formatTime(endTime).second
    },
    // 开奖第一部分的标题
    setLotteryFirst () {
      return this.getTitle().first
    },
    setLotterySecond () {
      return this.getTitle().second || ''
    },
    setLotteryEnd () {
      return this.getTitle().end || ''
    }
  },
  filters: {
    formatNumber (val) {
      return Number(val)
    }
  },
  methods: {
    // 官方开奖
    openOfficial () {
      window.open('http://www.1188kai.com')
    },
    close () {
      this.visible = false
    },
    open () {
      api.getHistoryResult({pageNo: 1, pageSize: 10, lotteryGamesId: this.$route.meta.gameCode})
      .then(result => {
        this.visible = true
        this.lotteryResult = result.data.response
      })
    },
    // 设置球的颜色
    setBallClass (i) {
      const {id} = this.$route.meta
      if (id === 8) {
        return `dice-default__${i}`
      }
      if (id === 7) {
        return `is-large ${setBallColor(i)}`
      }
      if (id !== 1 && id !== 4) {
        return 'is-large'
      }
      return `is-rect ball-default__${Number(i)}`
    },
    // 格式化时间
    formatTime (time) {
      let hours = Math.floor(time / 3600)
      hours = hours < 10 ? `0${hours}` : hours === 0 ? '00' : hours
      let minute = Math.floor(time / 60) % 60
      minute = minute < 10 ? `0${minute}` : minute === 0 ? '00' : minute
      let second = Math.floor(time % 60)
      second = second < 10 ? `0${second}` : second === 0 ? '00' : second
      return {
        hours,
        minute,
        second
      }
    },
    getTitle () {
      const {id} = this.$route.meta
      switch (id) {
        case 1:
          return {
            first: '冠亚和：',
            second: '1-5球：',
            title: '北京PK10',
            className: 'is-pk10'
          }
        case 4:
          return {
            first: '冠亚和：',
            second: '1-5球：',
            title: '幸运飞艇',
            className: 'is-xyft'
          }
        case 2:
          return {
            title: '重庆时时彩',
            className: 'is-cqssc',
            first: '总和：',
            second: '龙虎：'
          }
        case 3:
          return {
            title: 'PC蛋蛋',
            first: '总和：',
            className: 'is-pcegg'
          }
        case 5:
          return {
            title: '广东快乐十分',
            first: '总和：',
            second: '尾大小：',
            end: '1-4球：',
            className: 'is-klsf'
          }
        case 6:
          return {
            title: '重庆幸运农场',
            first: '总和：',
            second: '尾大小：',
            end: '1-4球：',
            className: 'is-xync'
          }
        case 7:
          return {
            title: '香港六合彩',
            first: '总分：',
            second: '生肖：',
            className: 'is-marksix'
          }
        case 8:
          return {
            title: '江苏骰宝（快3）',
            first: '总分：',
            second: '鱼虾蟹：',
            className: 'is-dice'
          }
        default:
          return {}
      }
    }
  }
}
</script>

