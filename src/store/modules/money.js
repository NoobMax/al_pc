import * as types from '../mutation-types'
import api from '@/api'
import {parsePayList} from '@/utils'
import {payTypeData} from '@/config/money.conf'

const state = {
  paymentList: [],
  bankInfo: {}
}

const getters = {
  paymentList: state => state.paymentList,
  bankInfo: state => state.bankInfo
}

const actions = {
  async fetchPaymentList ({commit}, params) {
    try {
      const data = await api.getPaymentList(params)
      if (data.data && data.data.httpCode === 200) {
        commit(types.RECEIVE_PAY_LIST, data.data.response)
        return true
      }
      return false
    } catch (error) {
      Promise.reject(error)
    }
  },
  async fetchBankInfo ({commit}, params) {
    try {
      const data = await api.getbankInfo(params)
      if (data.data && data.data.httpCode === 200) {
        commit(types.RECEIVE_BANK_INFO, data.data.response)
        return true
      }
      return false
    } catch (error) {
      Promise.reject(error)
    }
  }
}
const mutations = {
  // 支付列表
  [types.RECEIVE_PAY_LIST] (state, data) {
    if (data.length > 0) {
      state.paymentList = parsePayList(data, payTypeData)
    }
  },
  // 银行信息
  [types.RECEIVE_BANK_INFO] (state, data) {
    if (data.length > 0) {
      state.bankInfo = data[0]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
