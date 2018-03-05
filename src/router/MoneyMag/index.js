const MoneyRecharge = () => import('@/pages/MoneyMag/money_recharge')
const MoneyRechargeRoute = () => import('@/pages/MoneyMag/money_recharge_route')
const MoneyRechargeBanks = () => import('@/pages/MoneyMag/money_recharge_banks')
const MoneyRechargePayOffline = () => import('@/pages/MoneyMag/money_recharge_offline')
const MoneyWithdrawal = () => import('@/pages/MoneyMag/money_withdrawal')
const MoneyTransform = () => import('@/pages/MoneyMag/money_transform')

export default [
  {
    path: 'recharge',
    component: MoneyRechargeRoute,
    children: [
      {
        path: '',
        name: 'recharge',
        component: MoneyRecharge,
        meta: {step: 0}
      },
      {
        path: 'recharge/banks/:id',
        name: 'recharge_banks',
        meta: {step: 1},
        component: MoneyRechargeBanks
      },
      {
        path: 'recharge/offline/:id',
        name: 'recharge_pay_offline',
        meta: {step: 2},
        component: MoneyRechargePayOffline
      }
    ]
  },
  {
    path: 'withdrawal',
    name: 'withdrawal',
    component: MoneyWithdrawal
  },
  {
    path: 'transform',
    name: 'transform',
    component: MoneyTransform
  }
]
