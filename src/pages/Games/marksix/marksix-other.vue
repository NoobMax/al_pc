<template>
    <div class="betArea-content__list">
      <div class="betArea-content__item" :class="setRowClass" v-for="(item, index) in currentGames" :key="index">
        <div class="betArea-content__title">{{item.name}}
          <i class="triangle-icon__default triangle-icon__games"></i>
        </div>
        <div class="betArea-sub__content-list">
          <div :class="setSubClass">
            <template>
              <games-sub-nav :list="item.list" :active-id="activeId" @radio-change="radioChange"/>
              <div class="betArea-check-odds">
                <!-- <el-checkbox-group class="betArea-checkbox__group group-wrap"
                  v-model="checkList"
                  :max="limitMax">
                  <el-checkbox v-for="i in 40" :label="i" :key="i" :class="$setBallColor(i)" :disabled="setDisabled(i)"  class="betArea-checkbox__list is-other">{{i}}</el-checkbox>
                </el-checkbox-group> -->
                <games-checkbox-group :numbers="40" :max="limitMax" :active-id="activeId" :odds-list="oddsList" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import gamesSubNav from '@/components/Game/games-sub-nav'
import gamesCheckboxGroup from '@/components/Game/games-check-group'
import {mapGetters} from 'vuex'
import {limitBetNumber} from '@/utils'
export default {
  components: {
    gamesSubNav,
    gamesCheckboxGroup
  },
  data () {
    return {
      subList: [],
      activeId: '2983',
      checkList: [],
      limitMax: 10
    }
  },
  computed: {
    ...mapGetters([
      'currentGames',
      'oddsList'
    ]),
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
