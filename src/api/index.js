import config from '../config'
import axios from 'axios'
import {getCurrentGameCache, getErrorHttpCode} from '@/utils'
import store2 from 'store2'
import _ from 'lodash'

// config
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// response 处理
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error)
})

// 检查请求状态
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const err = new Error(500)
    err.response = response
    return err
  }
}
// check code
const checkCode = (response) => {
  if (response.data) {
    if (response.data.httpCode === 535 || response.data.httpCode === 536) {
      window.__cpVue__.$swal({
        type: 'error',
        title: '连接超时，请重新登录',
        timer: 1500
      })
      window.__cpVue__.$store.commit('clear_user_info')
      window.__cpVue__.$router.replace('/')
      return false
    }
    if (response.data.httpCode === 4001) {
      window.__cpVue__.$swal({
        type: 'error',
        title: '用户已被踢线',
        timer: 1500
      })
      window.__cpVue__.$store.commit('clear_user_info')
      window.__cpVue__.$router.replace('/')
      return false
    }
  }
  if (response.data && getErrorHttpCode(response.data.httpCode)) {
    window.__cpVue__.$swal({
      type: 'error',
      title: getErrorHttpCode(response.data.httpCode),
      timer: 2000
    })
    return false
  }
  if (response.message === '500') {
    window.__cpVue__.$swal({
      type: 'error',
      title: '网络错误',
      timer: 2000
    })
    return false
  } else if (response.status === 422) {

  }
  return response
}

// 解析参数
function _formatParams (method = 'GET', params) {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
  const userInfo = store2.session.get('user-info')
  switch (method) {
    case 'POST':
      return {
        headers,
        method,
        timeout: config.timeout,
        data: userInfo ? JSON.stringify(_.assign({}, {sessionId: userInfo.sessionId, usersId: userInfo.usersId}, params)) : JSON.stringify(params)
      }
    case 'PUT':
      return {
        headers,
        method,
        timeout: config.timeout,
        data: userInfo ? JSON.stringify(_.assign({}, {sessionId: userInfo.sessionId, usersId: userInfo.usersId}, params)) : JSON.stringify(params)
      }
    case 'DELETE':
      return {
        headers,
        method,
        timeout: config.timeout
      }
    case 'GET':
      return {
        headers,
        timeout: config.timeout
      }
    default:
      return {
        headers,
        timeout: config.timeout
      }
  }
}
const api = {
  // 轮播图
  getCarouselList (params) {
    return axios(_.assign({}, _formatParams('POST', {type: 1}), {
      url: `${config.api}/imageupload/carousel`
    })).then(checkStatus).then(checkCode)
  },
  // 试玩
  guest (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/touristslogin`
    })).then(checkStatus).then(checkCode)
  },
  // 登录
  login (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/login`
    })).then(checkStatus).then(checkCode)
  },
  // 检测用户名
  checkName (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/checkName`
    })).then(checkStatus).then(checkCode)
  },
  // 注册
  regist (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/register`
    })).then(checkStatus).then(checkCode)
  },
  // 修改密码
  updatePassword (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/updatepwd`
    })).then(checkStatus).then(checkCode)
  },
  // 修改支付密码
  updatePayPassword (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/updateplypwd`
    })).then(checkStatus).then(checkCode)
  },
  // 退出
  esc (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/esc`
    })).then(checkStatus).then(checkCode)
  },
  // 今日已结
  todayend (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/lotterybill/todayend`
    })).then(checkStatus).then(checkCode)
  },
  // 下注记录（汇总）
  summary (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/lotterybill/summary`
    })).then(checkStatus).then(checkCode)
  },
  // 未结明细
  findlotteyBill (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/lotterybill/findlotteyBill`
    })).then(checkStatus).then(checkCode)
  },
  // 获取赔率
  getCurrentGame (params) {
    if (getCurrentGameCache(params.play)) {
      return Promise.resolve(getCurrentGameCache(params.play))
    }
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/betting/bettingQuery`
    })).then(checkStatus).then(checkCode)
  },
  // 獲取開獎紀錄
  getHistoryResult (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/lotterOpen/historyOpenLottery`
    })).then(checkStatus).then(checkCode)
  },
  // 獲取存款紀錄
  getBalanceRecord (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/userdeposit/withdrawalsAndSaveDetail`
    })).then(checkStatus).then(checkCode)
  },
  // 提交投注
  submitOdds (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/betting/betting`
    })).then(checkStatus).then(checkCode)
  },
  // 获取开奖信息
  getLotteryInfo (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/lotterOpen/getinfo/periods`
    })).then(checkStatus).then(checkCode)
  },
  // 获取可支付的类型
  getPaymentList (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/onlinePay/payType`
    })).then(checkStatus).then(checkCode)
  },
  // 在线支付提交
  submitOnlinePay (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/onlinePay/pay`
    })).then(checkStatus).then(checkCode)
  },
  // 线下支付提交
  submitOfflinePay (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/offlinePay/TransactionRecord`
    })).then(checkStatus).then(checkCode)
  },
  // 获取银行卡信息
  getbankInfo (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/userdeposit/userBank`
    })).then(checkStatus).then(checkCode)
  },
  // 添加银行卡
  addBankInfo (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/userdeposit/bindBank`
    })).then(checkStatus).then(checkCode)
  },
  // 添加银行卡
  submitWithdraw (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/userdeposit/withdrawAmount`
    })).then(checkStatus).then(checkCode)
  },
  // 公告
  getNotifyList (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/announcement/findall`
    })).then(checkStatus).then(checkCode)
  },
  // 长龙
  getDragonList (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/lotterOpen/longOnBothSides`
    })).then(checkStatus).then(checkCode)
  },
  // 露珠
  getDewdropList (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/lotterOpen/dewdrop`
    })).then(checkStatus).then(checkCode)
  },
  // 新公告
  newmessage (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/announcement/newmessage`
    })).then(checkStatus).then(checkCode)
  }
}
export default api
