<template>
<div class="games-content">
  <game-header :lottery-info="lotteryInfo" :end-time="endTime" :closeEndTime="closeEndTime"/>
  <games-nav :tabs="tabs" :activeName="activeName" @tabs-click="navClick"/>
  <div class="games-betAreat">
    <el-form class="games-betAreat__form" @submit.stop.prevent="submit">
      <div class="betArea-content" :style="{marginTop: setMarginTop, overflow: loading ? 'hidden' : 'auto'}">
        <lazy-render>
          <router-view></router-view>
        </lazy-render>
        <transition name="el-fade-in-linear">
          <placeholderContent type="table" :title="true" :button-title="true" :number="5" :table-number="2" :table-column="6" :button="true" :loading="loading"></placeholderContent>
        </transition>  
      </div>
      <odds-form @submit-handle="submitDialog" @reset-handle="reset" :bet-close="betClose"/>
      <div class="games-dewdrop">
         <el-tabs v-model="activeDewName" @tab-click="handleClick">
          <el-tab-pane :label="item.title" :name="item.name" v-for="(item, index) in setDewnav" :key="index">
            <ul class="dewdrop-list">
              <dewdrop v-for="(item, index) in dewdropList" :key="index" :current="item" :status="index + 1"></dewdrop>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form>
    <div class="games-dragon">
      <div class="games-dragon__title">
        <span>两面长龙</span>
        <i class="triangle-icon__default triangle-icon__games"></i>
      </div>
      <div class="games-dragon__content">
        <dragon :list="dragonList" v-if="dragonList && dragonList.length > 0" />
        <p v-else>暂无数据</p>
      </div>
    </div>
  </div>
  <el-dialog title="投注明细" :visible="submitDialogVisible" custom-class="betArea-dialog" :close-on-click-modal="false" @close="dialogClose">
    <submit-dialog  @submit-handle="submitHandle" @cancel-handle="cancelHandle"
    @delete-handle="deleteHandle" :betAreaList="oddsList" :close-on-press-escape="false" :is-pick="isPick"
     />
  </el-dialog>
</div>
 
</template>
<script>
import Vue from 'vue'
import LazyRender from 'vue-lazy-render'
import submitDialog from '@/components/Game/submit-dialog'
import gameHeader from '@/components/Game/game-header'
import oddsForm from '@/components/Game/odds-form'
import {getBetNavList, getGamesHttpCode, isDouble, getDewDropNav} from '@/utils'
import gamesNav from '@/components/Game/games-nav'
import dragon from '@/components/Game/dragon-list'
import dewdrop from '@/components/Game/dewdrop-list'
import placeholderContent from '@/components/spinner-loading'
import {mapGetters} from 'vuex'
import _ from 'lodash'
import api from '@/api'
Vue.use(LazyRender)
export default {
  components: {
    gamesNav,
    oddsForm,
    submitDialog,
    gameHeader,
    placeholderContent,
    dragon,
    dewdrop
  },
  data () {
    return {
      tabs: [],
      activeName: '17',
      submitDialogVisible: false,
      isPick: false,
      btnDisabled: false,
      endTime: 0,
      closeEndTime: 0,
      loading: false,
      activeDewName: '1'
    }
  },
  computed: {
    ...mapGetters([
      'oddsList',
      'lotteryInfo',
      'betClose',
      'lazyLoading',
      'dragonList',
      'dewdropList'
    ]),
    setDewnav () {
      const {gameCode} = this.$route.meta
      return getDewDropNav(gameCode)
    },
    setBtnDisabled () {
      return this.btnDisabled || this.betClose
    },
    setMarginTop () {
      const {play} = this.$route.query
      const {id} = this.$route.meta
      if (id === 7) {
        if ((play >= 2250 && play <= 2495) || (play >= 3040 && play <= 3281)) {
          return '30px'
        }
      }
      return 0
    }
  },
  methods: {
    // 露珠切换时的功能
    handleClick (item) {
      const {gameCode} = this.$route.meta
      this.$store.dispatch('fetchDewdrop', {lotteryGamesId: gameCode, lotteryGamesType: Number(item.name)})
    },
    reset () {
      this.$store.commit('reset_odds_list')
      if (!isDouble(this.$route.query.play)) {
        this.$store.commit('reset_games')
      }
    },
    // 关闭弹窗
    dialogClose () {
      this.$store.commit('submit_dialog_visible', false)
      this.submitDialogVisible = false
      this.$store.commit('reset_odds_list')
      if (!isDouble(this.activeName)) {
        this.$store.commit('reset_games')
      }
    },
    // 提交框
    submitDialog () {
      this.isPick = isDouble(this.activeName)
      this.submitDialogVisible = true
      if (!isDouble(this.activeName)) {
        this.$store.commit('reset_games')
      }
    },
    // 导航切换
    navClick (item) {
      this.activeName = item.play
      this.$router.replace({name: this.$route.name, query: {play: item.play}})
    },
    parseSubmitForm (singleMoney) {
      const plays = _.map(this.oddsList, item => {
        if (this.isPick) {
          const lotterygamesId = item.lotterygamesId + ',' + item.round.toString()
          return {
            lotterygamesId,
            singleMoney
          }
        }
        return {
          lotterygamesId: item.key,
          singleMoney: item.singleMoney
        }
      })
      return {plays, round: this.lotteryInfo.next.round}
    },
    // 提交
    submitHandle (singleMoney) {
      this.$store.commit('submit_dialog_visible', false)
      if ((!this.isPick && _.filter(this.oddsList, item => !item.singleMoney).length > 0) || (this.isPick && !singleMoney)) {
        this.$swal({
          type: 'error',
          title: '金额不能为空',
          timer: 1500
        })
        return false
      }
      const loading = this.$loading({
        background: 'rgba(0, 0, 0, 0.6)'
      })
      api.submitOdds(this.parseSubmitForm(singleMoney)).then(data => {
        loading.close()
        if (data.data.httpCode === 526) {
          this.$swal({
            type: 'success',
            title: '投注成功',
            timer: 1500
          })
          this.submitDialogVisible = false
          this.$store.commit('reset_odds_list')
          if (!isDouble(this.activeName)) {
            console.log(this.activeName)
            this.$store.commit('reset_games')
          }
        } else {
          this.$swal({
            type: 'error',
            title: getGamesHttpCode(data.data.httpCode),
            timer: 1500
          })
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 取消
    cancelHandle () {
      this.submitDialogVisible = false
      this.$store.commit('reset_odds_list')
      this.$store.commit('submit_dialog_visible', false)
      if (!isDouble(this.activeName)) {
        this.$store.commit('reset_games')
      }
    },
    // 删除当前的投注
    deleteHandle (index) {
      this.$store.commit('delete_current_odds', index)
      if (this.oddsList.length === 0) {
        setTimeout(() => {
          this.submitDialogVisible = false
        }, 400)
      }
    },
    // 获取开奖时间和封盘时间
    getTimes (lotteryInfo) {
      return {
        endTime: lotteryInfo.next ? lotteryInfo.next.endTime - lotteryInfo.next.timestamp : 0,
        closeEndTime: lotteryInfo.next ? lotteryInfo.next.closeTime - lotteryInfo.next.timestamp : 0
      }
    },
    setCloseInfo (lotteryInfo) {
      if (lotteryInfo.next) {
        this.endTime = this.getTimes(lotteryInfo).endTime
        this.closeEndTime = this.getTimes(lotteryInfo).closeEndTime
        if (this.closeEndTime <= 0 || lotteryInfo.next.isClose === 1) {
          this.$store.commit('receive_bet_status', true)
        } else {
          this.$store.commit('receive_bet_status', false)
        }
      } else {
        this.$store.commit('receive_bet_status', true)
      }
    }
  },
  mounted () {
    setInterval(() => {
      if (this.endTime > 0) {
        this.endTime--
        this.closeEndTime--
        if (this.closeEndTime === 0) {
          this.$store.commit('receive_bet_status', true)
        }
      }
    }, 1000)
  },
  watch: {
    endTime (val) {
      if (val === 0 || val === 200 || val === 210 || val === 190 || val === 220 || val === 230 || val === 240) {
        const {gameCode} = this.$route.meta
        this.$store.dispatch('fetchLotteryInfo', {gameCode}).then(() => {
          const {lotteryInfo} = this.$store.getters
          this.endTime = this.getTimes(lotteryInfo).endTime
          this.closeEndTime = this.getTimes(lotteryInfo).closeEndTime
          if (this.closeEndTime <= 0) {
            this.$store.commit('receive_bet_status', true)
          } else {
            this.$store.commit('receive_bet_status', false)
          }
        })
      }
    },
    $route (route, oldRoute) {
      if (route.path !== '/' && route.path.includes('/home/games')) {
        const {play} = route.query
        const {gameCode} = route.meta
        this.loading = true
        this.$store.dispatch('fetchCurrentGame', {play}).then(() => {
          if (this.$store.getters.lazyLoading) {
            setTimeout(() => {
              this.loading = false
            }, 300)
          } else {
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
        this.tabs = getBetNavList(route.meta.id)
        this.activeName = play
        if (route.name !== oldRoute.name) {
          this.activeDewName = '1'
          this.$store.dispatch('fetchDewdrop', {lotteryGamesId: gameCode, lotteryGamesType: 1})
          this.$store.dispatch('fetchDragon', {lotteryGamesId: gameCode})
          this.$store.dispatch('fetchLotteryInfo', {gameCode}).then(() => {
            const {lotteryInfo} = this.$store.getters
            this.setCloseInfo(lotteryInfo)
          })
        }
        if (this.oddsList.length > 0) {
          this.$store.commit('reset_odds_list')
          if (!isDouble(this.activeName)) {
            this.$store.commit('reset_games')
          }
        }
      }
    }
  },
  created () {
    // 获取id
    const {id} = this.$route.meta
    // 根据路由id 获取对应的tabs
    this.tabs = getBetNavList(id)
    const {play} = this.$route.query
    const {gameCode} = this.$route.meta
    this.loading = true
    this.activeName = play || '17'
    this.$store.dispatch('fetchCurrentGame', {play: play || '17'}).then(() => {
      if (this.$store.getters.lazyLoading) {
        setTimeout(() => {
          this.loading = false
        }, 300)
      } else {
        this.loading = false
      }
    }).catch(() => {
      this.loading = false
    })
    this.$store.dispatch('fetchDewdrop', {lotteryGamesId: gameCode, lotteryGamesType: 1})
    this.activeDewName = '1'
    this.$store.dispatch('fetchDragon', {lotteryGamesId: gameCode})
    this.$store.dispatch('fetchLotteryInfo', {gameCode}).then(() => {
      const {lotteryInfo} = this.$store.getters
      this.setCloseInfo(lotteryInfo)
    }).catch(() => {
      // this.loading = false
    })
  }
}
</script>

