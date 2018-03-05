const GamePk10 = () => import('@/pages/Games/pk10')
const GameCqssc = () => import('@/pages/Games/cqssc')
const GamePcegg = () => import('@/pages/Games/pcegg')
const GameXyft = () => import('@/pages/Games/xyft')
const GameKlsf = () => import('@/pages/Games/klsf')
const GameXync = () => import('@/pages/Games/xync')
const GameMarksix = () => import('@/pages/Games/marksix')
const GameDice = () => import('@/pages/Games/dice')
const GameSpeedShip = () => import('@/pages/Games/speed-ship')
export default [
  {
    path: 'pk10',
    name: 'games_pk10',
    component: GamePk10,
    meta: {id: 1, name: 'pk10', gameCode: 3}
  },
  {
    path: 'cqssc',
    name: 'games_cqssc',
    component: GameCqssc,
    meta: {id: 2, name: 'cqssc', gameCode: 4}
  },
  {
    path: 'pcegg',
    name: 'games_pcegg',
    component: GamePcegg,
    meta: {id: 3, name: 'pcegg', gameCode: 6}
  },
  {
    path: 'xyft',
    name: 'games_xyft',
    component: GameXyft,
    meta: {id: 4, name: 'xyft', gameCode: 5}
  },
  {
    path: 'klsf',
    name: 'games_klsf',
    component: GameKlsf,
    meta: {id: 5, name: 'klsf', gameCode: 7}
  },
  {
    path: 'xync',
    name: 'games_xync',
    component: GameXync,
    meta: {id: 6, name: 'xync', gameCode: 8}
  },
  {
    path: 'marksix',
    name: 'games_marksix',
    component: GameMarksix,
    meta: {id: 7, name: 'marksix', gameCode: 9}
  },
  {
    path: 'dice',
    name: 'games_dice',
    component: GameDice,
    meta: {id: 8, name: 'dice', gameCode: 10}
  },
  {
    path: 'speedShip',
    name: 'games_speedShip',
    component: GameSpeedShip,
    meta: {id: 9, name: 'speedShip', gameCode: 11}
  }
]
