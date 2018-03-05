import store2 from 'store2'
import * as types from '../mutation-types'
// state
const state = {
  userInfo: {}
}
const getters = {
  userInfo: state => state.userInfo
}
const mutations = {
  // 缓存用户信息
  [types.RECEIVE_USER_INFO] (state) {
    if (store2.session.get('user-info')) {
      state.userInfo = store2.session.get('user-info')
    }
  },
  // 清空sessionId 和用户信息
  [types.CLEAR_USER_INFO] (state) {
    if (store2.session.get('user-info')) {
      state.userInfo = {}
      store2.session.remove('user-info')
    }
  },
  // 更新余额
  [types.UPDATE_USER_BALANCE] (state, {balance}) {
    state.userInfo.balance = balance
    store2.session.set('user-info', state.userInfo)
  }
}
export default {
  state,
  getters,
  mutations
}
