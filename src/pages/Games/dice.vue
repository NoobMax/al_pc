<template>
    <div class="betArea-content__list">
      <div class="betArea-content__item" :class="setRowClass" v-for="(item, index) in currentGames" :key="index">
        <div class="betArea-content__title">
          {{item.name}}
          <i class="triangle-icon__default triangle-icon__games"></i>
        </div>
        <div class="betArea-sub__content-list">
          <div :class="setSubClass">
            <input-odds v-for="(current, key) in item.list" :current="current" :key="key" :class="setCurrentClass" />
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
    setCurrentClass () {
      return 'is-full-25'
    },
    setSubClass (index) {
      return 'betArea-sub__content-item'
    },
    setRowClass () {
      return 'is-full-100'
    }
  }
}
</script>

