import {getPubilcImg} from '@/utils'
export const menuList = [
  {
    path: '/home/money/recharge',
    title: '我要充值'
  },
  {
    path: '/home/money/withdrawal',
    title: '我要提现'
  },
  {
    path: '/home/money/transform',
    title: '额度转换'
  }
]

export const bankList = [
  {
    id: 1,
    img: require('../assets/images/public/bank/bank_zgyh.png'),
    title: '中国银行',
    swift: 'BANK_BOC'
  },
  {
    id: 2,
    img: require('../assets/images/public/bank/bank_gs.png'),
    title: '工商银行',
    swift: 'BANK_ICBC'
  },
  {
    id: 3,
    img: require('../assets/images/public/bank/bank_js.png'),
    title: '建设银行',
    swift: 'BANK_CCB'
  },
  {
    id: 4,
    img: require('../assets/images/public/bank/bank_jt.png'),
    title: '交通银行',
    swift: 'BANK_BCM'
  },
  {
    id: 5,
    img: require('../assets/images/public/bank/bank_zs.png'),
    title: '招商银行',
    swift: 'BANK_CMB'
  },
  {
    id: 6,
    img: require('../assets/images/public/bank/bank_ny.png'),
    title: '农业银行',
    swift: 'BANK_ABC'
  },
  {
    id: 7,
    img: require('../assets/images/public/bank/bank_ms.png'),
    title: '民生银行',
    swift: 'BANK_CMBC'
  },
  {
    id: 8,
    img: require('../assets/images/public/bank/bank_gd.png'),
    title: '光大银行',
    swift: 'BANK_CEB'
  },
  {
    id: 9,
    img: require('../assets/images/public/bank/bank_zx.png'),
    title: '中信银行',
    swift: 'BANK_CCB'
  },
  {
    id: 10,
    img: require('../assets/images/public/bank/bank_xy.png'),
    title: '兴业银行',
    swift: 'CIB'
  },
  {
    id: 11,
    img: require('../assets/images/public/bank/bank_pf.png'),
    title: '浦发银行',
    swift: 'BANK_SPDB'
  },
  {
    id: 12,
    img: require('../assets/images/public/bank/bank_hx.png'),
    title: '华夏银行',
    swift: 'HB'
  },
  {
    id: 13,
    img: require('../assets/images/public/bank/bank_pa.png'),
    title: '平安银行',
    swift: ''
  },
  {
    id: 14,
    img: require('../assets/images/public/bank/bank_gf.png'),
    title: '广发银行',
    swift: ''
  },
  {
    id: 15,
    img: require('../assets/images/public/bank/bank_yz.png'),
    title: '邮政银行',
    swift: 'BANK_PSBC'
  },
  {
    id: 16,
    img: require('../assets/images/public/bank/bank_bh.png'),
    title: '渤海银行',
    swift: ''
  },
  {
    id: 17,
    img: require('../assets/images/public/bank/bank_ns.png'),
    title: '北京农商',
    swift: ''
  },
  {
    id: 18,
    img: require('../assets/images/public/bank/bank_sh.png'),
    title: '上海银行',
    swift: ''
  }
]
export const transfromMoneyList = [
  {
    id: 1,
    money: 100
  },
  {
    id: 2,
    money: 200
  },
  {
    id: 3,
    money: 1000
  },
  {
    id: 4,
    money: 5000
  },
  {
    id: 5,
    money: 10000
  },
  {
    id: 6,
    money: 50000
  }
]
export const moneyList = [
  {
    id: 1,
    money: 101
  },
  {
    id: 2,
    money: 201
  },
  {
    id: 3,
    money: 504
  },
  {
    id: 4,
    money: 1005
  },
  {
    id: 5,
    money: 2005
  },
  {
    id: 6,
    money: 3005
  },
  {
    id: 7,
    money: 5005
  },
  {
    id: 8,
    money: 10005
  }
]

export const payTypeData = [
  {
    id: 1,
    title: '网银支付',
    online: true
  },
  {
    id: 5,
    title: '银联线下',
    online: false
  },
  {
    id: 2,
    title: '支付宝支付',
    online: true
  },
  {
    id: 4,
    title: '支付宝线下',
    online: false
  },
  {
    id: 3,
    title: '微信支付',
    online: true
  },
  {
    id: 6,
    title: '微信线下',
    online: false
  },
  {
    id: 4,
    title: '财付通',
    online: true
  },
  {
    id: 8,
    title: '财付通线下',
    online: false
  }
]

export const payType = [
  {
    title: '银联支付',
    id: 1,
    img: getPubilcImg('/img/pc/static/images/common/icon/withdraw-unionpay.png')
  },
  {
    title: '支付宝',
    id: 2,
    img: getPubilcImg('/img/pc/static/images/common/icon/withdraw-alipay.png')
  },
  {
    title: '微信支付',
    id: 3,
    img: getPubilcImg('/img/pc/static/images/common/icon/withdraw-wechatpay.png')
  },
  {
    title: '财付通',
    id: 4,
    img: getPubilcImg('/img/pc/static/images/common/icon/withdraw-cai.png')
  }
]
