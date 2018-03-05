const lotterySource = {
  pk10: {
    title: '北京赛车',
    name: 'pk10',
    numberStyle: 'color-style1 number-square',
    id: '3',
    benchmark: 5,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1, width: '139px'},
        {title: '开奖期数', colspan: 1, width: '85px'},
        {title: 'number-area', colspan: 1, width: '400px'},
        {title: '冠亚和', colspan: 3, width: '156px'},
        {title: '', colspan: 1, width: '50px'},
        {title: '1-5球', colspan: 5, width: '249px'}
      ],
      td: [
        {name: 'openTime', width: ''},
        {name: 'round', width: ''},
        {name: 'number-area', width: ''},
        {name: 'champSum', width: ''},
        {name: '', width: ''},
        {name: 'dragonTiger', width: ''}
      ]
    }
  },
  cqssc: {
    title: '重庆时时彩',
    name: 'cqssc',
    numberStyle: 'number-ball',
    id: '4',
    benchmark: 4,
    summaryBenchmark: 22,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1, width: '182px'},
        {title: '开奖期数', colspan: 1, width: '173px'},
        {title: 'number-area', colspan: 1, width: '385px'},
        {title: '总和', colspan: 3, width: '135px'},
        {title: '龙虎', colspan: 1, width: '184px'}
      ],
      td: [
        {name: 'openTime', width: ''},
        {name: 'round', width: ''},
        {name: 'number-area', width: ''},
        {name: 'summary', width: ''},
        {name: 'singleDragonTiger', width: ''}
      ]
    }
  },
  xyft: {
    title: '幸运飞艇',
    name: 'xyft',
    numberStyle: 'color-style1 number-square',
    id: '5',
    benchmark: 5,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1, width: '133px'},
        {title: '开奖期数', colspan: 1, width: '121px'},
        {title: 'number-area', colspan: 1, width: '385px'},
        {title: '冠亚和', colspan: 3, width: '150px'},
        {title: '', colspan: 1, width: '50px'},
        {title: '1-5球', colspan: 5, width: '240px'}
      ],
      td: [
        {name: 'openTime', width: ''},
        {name: 'round', width: ''},
        {name: 'number-area', width: ''},
        {name: 'champSum', width: ''},
        {name: '', width: ''},
        {name: 'dragonTiger', width: ''}
      ]
    }
  },
  pcegg: {
    title: 'PC蛋蛋',
    name: 'pcegg',
    numberStyle: 'number-ball',
    id: '6',
    benchmark: 5,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1, width: '213px'},
        {title: '开奖期数', colspan: 1, width: '130px'},
        {title: 'number-area', colspan: 1, width: '449px'},
        {title: '和值', colspan: 3, width: '120px'},
        {title: '', colspan: 1, width: '150px'}
      ],
      td: [
        {name: 'openTime', width: ''},
        {name: 'round', width: ''},
        {name: 'number-area', width: ''},
        {name: 'pcddSummary', width: '40px'},
        {name: '', width: ''}
      ]
    }
  },
  xync: {
    title: '重庆幸运农场',
    name: 'xync',
    numberStyle: 'number-ball cqxync',
    id: '8',
    benchmark: 10,
    summaryBenchmark: 84,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1, width: '121px'},
        {title: '开奖期数', colspan: 1, width: '125px'},
        {title: 'number-area', colspan: 1, width: '330px'},
        {title: '总和', colspan: 3, width: '150px'},
        {title: '', colspan: 1, width: '10px'},
        {title: '尾大小', colspan: 1, width: '150px'},
        {title: '1-4球', colspan: 4, width: '180px'}
      ],
      td: [
        {name: 'openTime', width: ''},
        {name: 'round', width: ''},
        {name: 'number-area', width: ''},
        {name: 'cqSummary', width: '50px'},
        {name: '', width: ''},
        {name: 'tailBigSmall', width: ''},
        {name: 'dragonTiger', width: ''}
      ]
    }
  },
  klsf: {
    title: '广东快乐十分',
    name: 'klsf',
    numberStyle: 'number-ball gdklsf',
    id: '7',
    benchmark: 10,
    summaryBenchmark: 84,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1, width: '121px'},
        {title: '开奖期数', colspan: 1, width: '125px'},
        {title: 'number-area', colspan: 1, width: '330px'},
        {title: '总和', colspan: 3, width: '150px'},
        {title: '', colspan: 1, width: '10px'},
        {title: '尾大小', colspan: 1, width: '150px'},
        {title: '1-4球', colspan: 4, width: '180px'}
      ],
      td: [
        {name: 'openTime', width: ''},
        {name: 'round', width: ''},
        {name: 'number-area', width: ''},
        {name: 'cqSummary', width: '50px'},
        {name: '', width: ''},
        {name: 'tailBigSmall', width: ''},
        {name: 'dragonTiger', width: ''}
      ]
    }
  },
  marksix: {
    title: '香港六合彩',
    name: 'marksix',
    numberStyle: 'number-ball marksix',
    id: '9',
    benchmark: 10,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1, width: '150px'},
        {title: '开奖期数', colspan: 1, width: '101px'},
        {title: 'marksix-result', colspan: 1, width: '339px'},
        {title: '总分', colspan: 1, width: '108px'},
        {title: '生肖', colspan: 7, width: '301px'},
        {title: '', colspan: 1, width: '70px'}
      ],
      td: [
        {name: 'openTime', width: ''},
        {name: 'round', width: ''},
        {name: 'marksix-result', width: ''},
        {name: 'sum', width: ''},
        {name: 'zodiac', width: ''},
        {name: '', width: ''}
      ]
    }
  }
  /* jsks's source not available right now, so marked it.
  jsks: {
    title: '江苏快三',
    name: 'jsks',
    id: '10',
    benchmark: 10,
    historyArea: {
      th: [
        {title: '开奖时间', colspan: 1},
        {title: '开奖期数', colspan: 1},
        {title: '开奖号码', colspan: 1},
        {title: '总和', colspan: 1},
        {title: '鱼虾蟹', colspan: 3}
      ],
      td: [
        'openTime',
        'round',
        'number-area',
        'sum',
        'fishShrimpCrab'
      ]
    }
  }
  */
}

export default lotterySource
