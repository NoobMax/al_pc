<template>
  <div class="games-input__item">
    <div class="games-input__title" :class="setTitleClass" v-if="setTitle">
        {{current.name}}
    </div>
    <div class="games-input__title" v-else :class="{'is-dice': current && !isNaN(current.name)}">
     <div class="games-input___title-current" :class="`dice-default__${i}`" v-for="i in setTitleName">{{i}}</div>
    </div>
    <div class="games-input__odds">
      <span>{{current.odds | formatOdds}}</span>
    </div>
    <div class="games-input__line">
      <el-col :span="22">
        <el-input size="mini" :type="betClose ? 'text' : 'number'" @focus="focusHandle"
         :disabled="betClose" :value="setValue" @input="inputHandle" @keyup.enter.native="submit" @keypress.native="keypress"/>
      </el-col>
    </div>
    <div class="games-input__numbers" v-if="current.number" :class="setNumberClass">
      <div v-for="i in current.number" class="games-input__numbers-item ball-default cp-client" :class="$setBallColor(i)"><span>{{i}}</span></div>
    </div>
  </div>
</template>
<script>
import filterMixins from '@/mixins/filters'
import inputMixins from '@/mixins/input'
import {mapGetters} from 'vuex'
export default {
  mixins: [filterMixins, inputMixins],
  props: {
    current: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'oddsList',
      'betClose',
      'presetMoney'
    ]),
    // 江苏骰宝的样式
    diceClass () {
      const {current} = this
      if (current && !isNaN(Number(current.name))) {
        return current.name.split('')
      }
      return [current.name]
    },
    // 江苏骰宝的值
    setTitleName () {
      const {current} = this
      if (current && !isNaN(Number(current.name))) {
        return current.name.split('')
      }
      return [current.name]
    },
    // 设置标题的显示
    setTitle () {
      return this.$route.meta.id !== 8
    },
    // 设置值
    setValue () {
      if (this.betClose) {
        return '封盘'
      }
      return this.current.singleMoney
    },
    // 设置投注标题的颜色
    setTitleClass () {
      const {play} = this.$route.query
      const {id} = this.$route.meta
      if (play === '31' || play === '42') {
        return 'is-middle'
      }
      if (play === '59') {
        return 'is-half'
      }
      if (id === 7 && !isNaN(Number(this.current.name))) {
        return `cp-client ball-default ${this.$setBallColor(this.current.name)}`
      }
      return ''
    },
    setNumberClass () {
      const {play} = this.$route.query
      return play === '60' || play === '61' ? 'is-last' : ''
    }
  },
  data () {
    return {
      money: ''
    }
  },
  methods: {
    submit () {
      this.$store.commit('submit_dialog_visible', true)
    },
    // Input 提交
    inputHandle (val) {
      const {current} = this
      this.$store.commit('receive_odds_list', {
        current,
        singleMoney: val
      })
      current.singleMoney = val
    },
    focusHandle () {
      if (this.presetMoney) {
        const {current} = this
        this.$store.commit('receive_odds_list', {
          current,
          singleMoney: this.presetMoney
        })
        current.singleMoney = this.presetMoney
      }
    }
  }
}
</script>

