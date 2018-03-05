<template>
    <div class="betArea-content__list">
      <component :is="currentView" :current-games="currentGames" />
    </div>
</template>
<script>
import marksixFirst from './marksix/marksix-first'
import marksixMiddle from './marksix/marksix-middle'
import marksixEnd from './marksix/marksix-end'
import marksixOther from './marksix/marksix-other'
import inputOdds from '@/components/Game/input-odds'
import {mapGetters} from 'vuex'
export default {
  components: {
    inputOdds,
    marksixFirst,
    marksixMiddle,
    marksixEnd,
    marksixOther
  },
  computed: {
    ...mapGetters([
      'currentGames'
    ]),
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
  data () {
    return {
      data: [],
      currentView: 'marksixFirst'
    }
  },
  watch: {
    $route (route) {
      this.currentView = this.setCurrentView(this.$route.query.play)
    }
  },
  methods: {
    setCurrentView (play) {
      switch (play) {
        case '2250':
        case '2251':
        case '2383':
        case '2384':
        case '2490':
        case '2491':
        case '2492':
        case '2493':
        case '2494':
        case '2495':
        case '2496':
        case '56':
          return 'marksixFirst'
        case '58':
          return 'marksixOther'
        case '57':
          return 'marksixEnd'
        case '59':
        case '60':
        case '61':
          return 'marksixMiddle'
        default:
          return 'marksixEnd'
      }
    },
    setCurrentClass (key) {
      const {play} = this.$route.query
      if ((play === '20' && key !== 5) || (play === '000')) {
        return 'is-flex-20'
      }
    }
  },
  created () {
    this.currentView = this.setCurrentView(this.$route.query.play)
  }
}
</script>

