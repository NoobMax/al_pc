<template>
    <div class="betArea-content__list">
      <div class="betArea-content__item" :class="setRowClass" v-for="(item, index) in currentGames" :key="index">
        <div class="betArea-content__title">
          {{item.name}}
        <i class="triangle-icon__default triangle-icon__games"></i>
        </div>
        <div class="betArea-sub__content-list">
          <div :class="setSubClass(index)">
            <input-odds v-for="(current, key) in item.list" :current="current" :key="key" :class="setCurrentClass(index)" />
          </div>
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
    setRowClass () {
      if (this.$route.query.play === '000') {
        return 'is-full-100'
      }
      return 'is-full-20'
    }
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    setSubClass (index) {
      const {play} = this.$route.query
      if ((play === '20' && index > this.currentGames.length - 2) || (play === '000')) {
        return 'betArea-sub__content-item'
        // return 'betArea-sub__row'
      }
    },
    setCurrentClass (key) {
      const {play} = this.$route.query
      if ((play === '20' && key !== 5) || (play === '000')) {
        return 'is-flex-20'
      }
    }
  }
}
</script>

