<template>
    <div class="betArea-content__list">
      <div class="betArea-content__item" :class="setRowClass" v-for="(item, index) in currentGames" :key="index">
        <div class="betArea-content__title">
          {{item.name}}
        <i class="triangle-icon__default triangle-icon__games"></i>
        </div>
        <div class="betArea-sub__content-list">
          <div :class="setSubClass">
            <template v-if="$route.query.play === '41'" >
              <games-sub-nav :list="item.list" :active-id="activeId" @radio-change="radioChange"/>
              <div class="betArea-check-odds">
                <!-- <el-checkbox-group class="betArea-checkbox__group group-wrap"
                  v-model="setCheckList"
                  :max="limitMax">
                  <el-checkbox v-for="i in 20" :label="i" :key="i" :disabled="setDisabled(i)" :class="$setBallColor(i)" class="betArea-checkbox__list is-other is-number">{{i}}</el-checkbox>
                </el-checkbox-group> -->
                <games-checkbox-group :numbers="20" :max="limitMax" :active-id="activeId" :odds-list="oddsList" />
              </div>
            </template>
            <input-odds v-for="(current, key) in item.list" :current="current" :key="key" :class="setCurrentClass" v-else />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import gamesSubNav from '@/components/Game/games-sub-nav'
import gamesCheckboxGroup from '@/components/Game/games-check-group'
import inputOdds from '@/components/Game/input-odds'
import {mapGetters} from 'vuex'
import {limitBetNumber} from '@/utils'
export default {
  components: {
    inputOdds,
    gamesSubNav,
    gamesCheckboxGroup
  },
  data () {
    return {
      subList: [],
      activeId: '1553',
      checkList: [],
      limitMax: 8
    }
  },
  computed: {
    ...mapGetters([
      'currentGames',
      'oddsList'
    ]),
    setCheckList: {
      get () {
        return this.checkList
      },
      set (val) {
        this.checkList = val
        this.$store.commit('receive_odds_list', {
          singleMoney: '',
          isDouble: true,
          current: {
            id: this.activeId,
            round: val
          }})
      }
    },
    setCurrentClass () {
      return 'is-full-25'
    },
    setSubClass (index) {
      return 'betArea-sub__content-item'
    },
    setRowClass () {
      return 'is-full-100'
    }
  },
  methods: {
    setDisabled (key) {
      return this.checkList.length === limitBetNumber(this.activeId).max && !this.checkList.includes(key)
    },
    radioChange (key, item) {
      this.activeId = key
      this.limitMax = limitBetNumber(key).max
      if (this.oddsList.length > 0) {
        this.$store.commit('reset_odds_list')
      }
    },
    setCurrentClasss (key) {
      const {play} = this.$route.query
      if ((play === '20' && key !== 5) || (play === '000')) {
        return 'is-flex-20'
      }
    }
  }
}
</script>
