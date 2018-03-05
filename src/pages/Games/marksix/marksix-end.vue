<template>
  <div>
    <div class="betArea-content__item" :class="setRowClass" v-for="(item, index) in setCurrentGames" :key="index">
      <div class="betArea-content__title">{{item.name}}
        <i class="triangle-icon__default triangle-icon__games"></i>
      </div>
      <div class="betArea-sub__content-list">
        <div :class="setSubClass">
          <div class="betArea-check-odds">
              <el-checkbox-group v-model="setCheckList" 
              :max="setLimitMax"
              class="betArea-checkbox__group" :key="i" v-for="(current, i) in item.list" :class="setGroupClass" ref="checkGroup">
                  <el-checkbox 
                  :disabled="setDisabled(i, current)" :label="current.key + '-' + current.name"  class="betArea-checkbox__list" :class="setCheckbox(current)">
                      {{current.name}}
                    </el-checkbox>
                  <div class="games-input__odds" :class="setOdds">
                    <span>{{current.odds | formatOdds}}</span>
                  </div>
                  <div class="games-input__numbers" v-if="current.number">
                    <div v-for="i in current.number" class="games-input__numbers-item ball-default cp-client" :class="$setBallColor(i)"><span>{{i}}</span></div>
                  </div>
                </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import filterMixins from '@/mixins/filters'
import {formatOdds, setCurrentGames, limitBetNumber} from '@/utils'
export default {
  mixins: [filterMixins],
  props: {
    currentGames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      checkList: [],
      limitMax: 8
    }
  },
  computed: {
    setLimitMax () {
      return limitBetNumber(this.$route.query.play).max
    },
    setCheckList: {
      get () {
        return this.checkList
      },
      set (val) {
        this.checkList = val
        const round = this.checkList.map(item => item.split('-')[0])
        const name = this.checkList.map(item => item.split('-')[1])
        this.$store.commit('receive_odds_list', {
          singleMoney: '',
          isDouble: true,
          current: {
            id: Number(this.$route.query.play),
            round,
            name
          }})
      }
    },
    ...mapGetters([
      'oddsList',
      'betClose'
    ]),
    setOdds () {
      const {play} = this.$route.query
      if (play >= 3274 && play <= 3281) {
        return 'is-full-95'
      }
    },
    // 按钮组样式
    setGroupClass () {
      const {play} = this.$route.query
      if (play >= 3274 && play <= 3281) {
        return 'is-full-20'
      }
    },
    setCurrentGames () {
      const {play} = this.$route.query
      const {currentGames} = this
      return formatOdds(currentGames, setCurrentGames(play))
    },
    setSubClass (index) {
      const {play} = this.$route.query
      if (play !== '21') {
      // return 'betArea-sub__row'
        return 'betArea-sub__content-item'
      }
    },
    setRowClass () {
      if (this.$route.query.play === '000') {
        return 'is-full-100'
      }
      return 'is-full-100'
    }
  },
  methods: {
    setCheckbox (current) {
      const {play} = this.$route.query
      if (!isNaN(Number(current.name))) {
        if (play >= 3274 && play <= 3281) {
          return `is-number ${this.$setBallColor(current.name)}`
        }
        return `is-number`
      }
    },
    setDisabled (key, item) {
      const max = limitBetNumber(this.$route.query.play).max
      return (this.checkList.length === max && !this.checkList.includes(`${item.key}-${item.name}`)) || this.betClose
    }
  },
  watch: {
    oddsList (val) {
      if (val.length === 0) {
        this.checkList = []
      }
    }
  }
}
</script>

