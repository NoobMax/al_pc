<template>
    <div class="betArea-content__list">
      <div class="betArea-content__item" :class="[setRowClass,index==0?setfrist:'']"  v-for="(item, index) in currentGames" :key="index">
        <div class="betArea-content__title">
          {{item.name}}
        <i class="triangle-icon__default triangle-icon__games"></i>
        </div>
        <div class="betArea-sub__content-list" :class="[setSubClass,index==0?setfristSubClass:'']">
          <input-odds v-for="(current, key) in item.list" :current="current" :key="key"/>
        </div>
      </div>
    </div>
</template>
<script>
import inputOdds from '@/components/Game/input-odds'
import {mapGetters} from 'vuex'
export default {
  components: {
    inputOdds
  },
  computed: {
    ...mapGetters([
      'currentGames'
    ]),
    setSubClass () {
      if (this.$route.query.play === '18') {
        return 'betArea-sub__row'
      }
    },
    setfristSubClass () {
      if (this.$route.query.play === '17') {
        return 'betArea-sub__row'
      }
    },
    setfrist () {
      if (this.$route.query.play === '17') {
        return 'is-full-100'
      }
    },
    setRowClass () {
      if (this.$route.query.play === '18') {
        return 'is-full-100'
      }
      return 'is-full-20'
    }
  },
  data () {
    return {
      data: []
    }
  }
}
</script>

