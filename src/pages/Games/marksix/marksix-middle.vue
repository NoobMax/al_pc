<template>
  <div>
    <div class="betArea-content__item" :class="setRowClass" v-for="(item, index) in setCurrentGames" :key="index">
      <div class="betArea-content__title">{{item.name}}
        <i class="triangle-icon__default triangle-icon__games"></i>
      </div>
      <div class="betArea-sub__content-list">
        <div :class="setSubClass">
          <input-odds v-for="(current, key) in item.list" :current="current" :key="key" :class="setOddsClass(index, currentGames.length)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {formatOdds, setCurrentGames} from '@/utils'
import inputOdds from '@/components/Game/input-odds'
export default {
  components: {
    inputOdds
  },
  props: {
    currentGames: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    setCurrentGames () {
      const {play} = this.$route.query
      const {currentGames} = this
      return formatOdds(currentGames, setCurrentGames(play), play === '60' ? 'play_one' : '')
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
    setOddsClass (index, len) {
      const {play} = this.$route.query
      if (play === '59') {
        return 'is-full-100'
      }
      if ((play === '60' && index === 1) || (play === '61')) {
        return 'is-full-50'
      }
      return ''
    }
  }
}
</script>

