<template>
  <el-checkbox-group class="betArea-checkbox__group group-wrap"
    v-model="setCheckList"
    :max="max">
    <el-checkbox v-for="i in numbers" :label="i" :key="i" :disabled="setDisabled(i)" :class="$setBallColor(i)" class="betArea-checkbox__list is-other is-number">{{i}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    activeId: {
      type: String,
      default: ''
    },
    oddsList: {
      type: Array,
      default: () => []
    },
    numbers: {
      type: Number,
      default: 20
    },
    max: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      checkList: []
    }
  },
  computed: {
    ...mapGetters([
      'betClose'
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
    }
  },
  methods: {
    setDisabled (key) {
      return (this.checkList.length === this.max && !this.checkList.includes(key)) || this.betClose
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

