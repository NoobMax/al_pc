import config from '@/config'
import store2 from 'store2'
import _ from 'lodash'
import {navPk10, navCqssc, navPcegg, navXyft, navKlsf, navXync, navMarksix, navDice} from '@/config/nav.conf'
import {halfRoundNums, oneRoundNums, especiallyNumber} from '@/config/roundnumber.conf'
import {pk10Nav, cqsscNav, xyftNav, klsfNav, xyncNav} from '@/config/dewdrop.conf'
/**
 * @param {*图片的当前路径} path
 */
const getPubilcImg = (path) => {
  return `${config.imgUrl}${path}`
}
/**
 * @param {*缓存的key} key
 */
const getCurrentGameCache = (key) => {
  return store2.get(`games_${key}`)
}
/**
 * @param {*缓存的key} key
 * @param {*缓存的值} value
 */
const setCurrentGameCache = (key, value) => {
  store2.set(`games_${key}`, value)
}
/**
 * @param {*当前的路由id} id
 */
const getBetNavList = (id) => {
  switch (id) {
    case 1:
      return navPk10
    case 2:
      return navCqssc
    case 3:
      return navPcegg
    case 4:
      return navXyft
    case 5:
      return navKlsf
    case 6:
      return navXync
    case 7:
      return navMarksix
    case 8:
      return navDice
    default:
      return navPk10
  }
}
/**
 * 设置各玩法限制的投注个数
 * @param {*采种的key} play
 */
const limitBetNumber = (play) => {
  switch (play) {
    // 连码
    case '1553':
    case '2082':
      return {
        min: 2,
        max: 8
      }
    case '1556':
    case '2085':
      return {
        min: 3,
        max: 8
      }
    case '1559':
    case '2088':
      return {
        min: 4,
        max: 6
      }
    case '1560':
    case '2089':
      return {
        min: 5,
        max: 6
      }
    // 香港六合彩连码
    case '2983':
    case '2978':
      return {
        min: 3,
        max: 10
      }
    case '2989':
      return {
        min: 4,
        max: 10
      }
    case '2986':
    case '4420':
    case '2980':
      return {
        min: 2,
        max: 10
      }
    // 合肖
    case '3040':
      return {
        min: 2,
        max: 2
      }
    case '3041':
      return {
        min: 3,
        max: 3
      }
    case '3042':
      return {
        min: 4,
        max: 4
      }
    case '3043':
      return {
        min: 5,
        max: 5
      }
    case '3044':
      return {
        min: 6,
        max: 6
      }
    // 生肖连
    case '3105':
    case '3109':
      return {
        min: 2,
        max: 8
      }
    case '3106':
    case '3110':
      return {
        min: 3,
        max: 8
      }
    case '3107':
    case '3111':
      return {
        min: 4,
        max: 8
      }
    case '3108':
      return {
        min: 5,
        max: 8
      }
    // 尾数连
    case '3196':
    case '3199':
      return {
        min: 2,
        max: 8
      }
    case '3197':
    case '3140':
      return {
        min: 3,
        max: 8
      }
    case '3198':
    case '3141':
      return {
        min: 4,
        max: 8
      }
    // 全不中
    case '3274':
      return {
        min: 5,
        max: 10
      }
    case '3275':
      return {
        min: 6,
        max: 10
      }
    case '3276':
      return {
        min: 7,
        max: 10
      }
    case '3277':
      return {
        min: 8,
        max: 10
      }
    case '3278':
      return {
        min: 9,
        max: 11
      }
    case '3279':
      return {
        min: 10,
        max: 12
      }
    case '3280':
      return {
        min: 11,
        max: 13
      }
    case '3281':
      return {
        min: 12,
        max: 15
      }
    default:
      return 6
  }
}
/**
 * 将球跟赔率合并一起
 * @param {*当前的赔率} currentGames
 * @param {*需要增加球的数组} numberList
 */
const formatOdds = (currentGames, numberList, status) => {
  return _.map(currentGames, (item, index) => {
    if (status === 'play_one') {
      if (index === 0) {
        return Object.assign({}, item)
      }
    }
    return Object.assign({}, item, {
      list: _.map(item.list, (item, index) => {
        return Object.assign(item, numberList[index])
      })
    })
  })
}
/**
 * 设置那些玩法需要手动加球号
 * @param {*玩法id} play
 */
const getRoundData = (play) => {
  if (play >= 59 && play < 3274) {
    return true
  }
  return false
}
/**
 * 根据玩法获取球号
 * @param {*玩法} play
 */
const setCurrentGames = (play) => {
  if (play === '59') {
    return halfRoundNums
  }
  if ((play >= 59 && play <= 61) || (play >= 3040 && play <= 3111)) {
    return oneRoundNums
  }
  if (play >= 3196 && play <= 3201) {
    return especiallyNumber
  }
  return []
}
/**
 * @param {*球号的名称} name
 */
const setBallColor = (name) => {
  switch (Number(name)) {
    case 1:
    case 2:
    case 7:
    case 8:
    case 12:
    case 13:
    case 18:
    case 19:
    case 23:
    case 24:
    case 29:
    case 30:
    case 34:
    case 35:
    case 40:
    case 45:
    case 46:
      return 'is-red'
    case 3:
    case 4:
    case 9:
    case 10:
    case 14:
    case 15:
    case 20:
    case 25:
    case 26:
    case 31:
    case 36:
    case 37:
    case 41:
    case 42:
    case 47:
    case 48:
      return 'is-blue'
    case 5:
    case 6:
    case 11:
    case 16:
    case 17:
    case 21:
    case 22:
    case 27:
    case 28:
    case 32:
    case 33:
    case 38:
    case 39:
    case 43:
    case 44:
    case 49:
      return 'is-green'
    default:
      return 'normal'
  }
}
/**
 * 投注的返回状态码
 * @param {*} httpCode
 */
const getGamesHttpCode = (httpCode) => {
  switch (httpCode) {
    case 527:
      return '投注失败'
    case 517:
      return '用户余额不足'
    case 539:
      return '用户没有拥有此游戏或已维护'
    case 540:
      return '游戏已封盘'
    case 541:
      return '小于单注最小下注金额'
    case 542:
      return '大于单注最大下注金额'
    case 543:
      return '大于单期最高限额'
    case 544:
      return '两名盘玩法不允许对买'
    default:
      return ''
  }
}
const getErrorHttpCode = (httpCode) => {
  switch (httpCode) {
    case 2002:
      return '用户不存在'
    case 523:
      return '用户已在线'
    case 2001:
      return '账号或密码错误'
    case 519:
      return '银行卡已存在'
    case 518:
      return '网络错误'
    case 512:
      return '旧密码错误'
    case 531:
      return '提现失败'
    default:
      return ''
  }
}
/**
 * 判断是单选还是复选
 * @param {*玩法编号} play
 */
const isDouble = (play) => {
  if (play === '41' || play === '52' || play === '58' || (play >= 3040 && play <= 3281)) {
    return true
  }
  return false
}

/**
 * 清空数据
 * @param {*当前数据} currentGames
 */
const clearGames = (currentGames) => {
  return _.map(currentGames, item => {
    return {
      name: item.name,
      list: _.map(item.list, current => {
        return _.assign({}, current, {singleMoney: ''})
      })
    }
  })
}

/**
 * 将支付数组和数据结合
 * @param {*数据库获取的可支付类型} paymentClass
 * @param {*页面展示的支付数组} payList
 */
const parsePayList = (paymentClass, payList) => {
  _.forEach(payList, (item) => {
    _.forEach(paymentClass, payment => {
      if (item.online) {
        _.forEach(payment.onlinepay, current => {
          if (current.paymentClass === item.id) {
            item.channel = _.sample(current.channel)
          }
        })
      } else {
        _.forEach(payment.offlinepay, current => {
          if (current.paymentClass === item.id) {
            item.channel = _.sample(current.channel)
          }
        })
      }
    })
  })
  return payList
}

const getDewDropNav = (lotterygamesId) => {
  switch (Number(lotterygamesId)) {
    case 3:
      return pk10Nav
    case 4:
      return cqsscNav
    case 5:
      return xyftNav
    case 7:
      return klsfNav
    case 8:
      return xyncNav
    default:
      return []
  }
}
/**
 * 判断是否有sessionId
 */
const isSessionIdNull = () => {
  const userInfo = store2.session.get('user-info')
  return userInfo && userInfo.sessionId && userInfo.guest === 1
}
export {getPubilcImg, getCurrentGameCache, getErrorHttpCode, isSessionIdNull,
  getGamesHttpCode, isDouble, clearGames, parsePayList, getDewDropNav,
  setCurrentGameCache, getBetNavList, limitBetNumber, formatOdds, getRoundData, setCurrentGames, setBallColor}
