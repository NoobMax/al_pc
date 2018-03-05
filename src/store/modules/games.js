import {getCurrentGameCache, setCurrentGameCache, isDouble, clearGames} from '@/utils'
import * as types from '../mutation-types'
import api from '@/api'
import _ from 'lodash'
const state = {
  currentGames: [],
  oddsList: [],
  lotteryInfo: {},
  betClose: false, // 是否封盘
  lazyLoading: false, // 是否延迟loading
  submitDialogVisible: false,
  doubleMoney: '',
  presetMoney: '', // 预设金额
  presetStatus: true,
  dragonList: [], // 长龙
  dewdropList: [] // 露珠
}

const getters = {
  currentGames: state => state.currentGames,
  oddsList: state => state.oddsList,
  lotteryInfo: state => state.lotteryInfo,
  betClose: state => state.betClose,
  lazyLoading: state => state.lazyLoading,
  submitDialogVisible: state => state.submitDialogVisible,
  presetMoney: state => state.presetMoney,
  presetStatus: state => state.presetStatus,
  doubleMoney: state => state.doubleMoney,
  dragonList: state => state.dragonList,
  dewdropList: state => state.dewdropList
}

const actions = {
  // 获取露珠
  async fetchDewdrop ({commit}, params) {
    try {
      const data = await api.getDewdropList(params)
      if (data.data && data.data.httpCode === 200) {
        commit(types.RECEIVE_DEWDROP_LIST, data.data.response)
      }
      return true
    } catch (error) {
      Promise.reject(error)
    }
  },
  // 获取长龙
  async fetchDragon ({commit}, params) {
    try {
      const data = await api.getDragonList(params)
      if (data.data && data.data.httpCode === 200) {
        commit(types.RECEIVE_DRAGON_LIST, data.data.response)
      }
      return true
    } catch (error) {
      Promise.reject(error)
    }
  },
  // 获取当前游戏
  async fetchCurrentGame ({commit}, params) {
    try {
      const data = await api.getCurrentGame(params)
      if (data.data && data.data.httpCode === 200) {
        commit(types.RECEIVE_CURRENT_GAME, {data: data.data.response, play: params.play})
        if (!getCurrentGameCache(params.play)) {
          setCurrentGameCache(params.play, data)
          commit(types.LAZY_LOADING_STATUS, true)
        } else {
          commit(types.LAZY_LOADING_STATUS, false)
        }
        return {status: 200}
      }
      return Promise.resolve({status: -200})
    } catch (error) {
      Promise.reject(error)
    }
  },
  async fetchLotteryInfo ({commit}, params) {
    try {
      const data = await api.getLotteryInfo(params)
      if (data.data && data.data.httpCode === 200) {
        commit(types.RECEIVE_LOTTERY_INFO, data.data.response[0])
      }
      return {}
    } catch (error) {
      Promise.reject(error)
    }
  }
}
const mutations = {
  // 获取露珠
  [types.RECEIVE_DEWDROP_LIST] (state, data) {
    state.dewdropList = data && data.length > 0 ? data.reverse() : data
  },
  // 获取长龙
  [types.RECEIVE_DRAGON_LIST] (state, data) {
    state.dragonList = data
  },
  // 获取游戏
  [types.RECEIVE_CURRENT_GAME] (state, {data, play}) {
    if (isDouble(play)) {
      state.currentGames = data
    } else {
      state.currentGames = clearGames(data)
    }
  },
  // 获取用户投注的数据
  [types.RECEIVE_ODDS_LIST] (state, {singleMoney, current, isDouble}) {
    if (!isDouble) {
      current.singleMoney = singleMoney
      // 单式投注
      const idx = _.findIndex(state.oddsList, item => item.key === current.key)
      if (idx > -1) {
        state.oddsList = _.map(state.oddsList, item => {
          if (item.key === current.key) {
            return _.assign({}, item, {
              singleMoney
            })
          }
          return item
        })
      } else {
        state.oddsList.push(_.assign({}, current, {singleMoney}))
      }
    } else {
      state.oddsList = [{
        lotterygamesId: current.id,
        round: current.round,
        name: current.name
      }]
    }
  },
  // 删除一行投注的数据
  [types.DELETE_CURRENT_ODDS] (state, idx) {
    state.oddsList.splice(idx, 1)
  },
  // 重置input值
  [types.RESET_GAMES] (state) {
    _.forEach(state.currentGames, item => {
      _.forEach(item.list, current => {
        if (current.singleMoney) {
          current.singleMoney = ''
        }
      })
    })
  },
  // 重置投注数据
  [types.RESET_ODDS_LIST] (state) {
    state.oddsList = []
    // state.presetMoney = ''
  },
  // 修改当前的
  [types.MODIFY_CURRENT_ODDS] (state, {current, singleMoney}) {
    state.oddsList = _.map(state.oddsList, item => {
      if (item.key === current.key) {
        return _.assign({}, item, {
          singleMoney
        })
      }
      return item
    })
  },
  // 获取开奖信息
  [types.RECEIVE_LOTTERY_INFO] (state, data) {
    state.lotteryInfo = data
  },
  // 是否封盘
  [types.RECEIVE_BET_STATUS] (state, status) {
    state.betClose = status
  },
  // 是否延迟加载loading
  [types.LAZY_LOADING_STATUS] (state, status) {
    state.lazyLoading = status
  },
  // 提交弹窗
  [types.SUBMIT_DIALOG_VISIBLE] (state, status) {
    state.submitDialogVisible = status
  },
  // 设置预设金额
  [types.SET_PRESET_MONEY] (state, value) {
    state.presetMoney = value
  },
  // 复选的金额
  [types.SET_DOUBLE_MONEY] (state, value) {
    state.doubleMoney = value
  }

}
export default {
  state,
  getters,
  mutations,
  actions
}
