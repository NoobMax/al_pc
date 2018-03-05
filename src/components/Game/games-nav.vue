<template>
  <div class="cp-tabs">
    <div class="cp-tabs__nav" ref="tabs">
      <template  v-for="(item, index) in tabs">
        <div class="cp-tabs__nav-item" :class="formatClass(item)">
          <a href="#" @click.prevent="clickHandle(item, index)">{{item.title}}</a>
          <div class="cp-tabs__nav-item-hr"></div>
        </div>
        <div class="cp-tabs__subs"  v-show="subShowRules(item)">
          <div class="cp-tabs__subs-item" v-for="(current, key) in item.child" :key="key" :class="activeName === current.play ? 'is-active' : ''">
            <a href="#" @click.prevent="clickHandle(current, index)">{{current.title}}</a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    tabs: {
      type: Array
    },
    activeName: {
      type: String,
      default: '0'
    }
  },
  methods: {
    subShowRules (item) {
      if (item.child) {
        const idx = _.findIndex(item.child, item => item.play === this.activeName)
        return idx > -1
      }
      return false
    },
    formatClass (item) {
      if (item.child) {
        const idx = _.findIndex(item.child, item => item.play === this.activeName)
        return idx > -1 ? 'is-active' : ''
      }
      return this.activeName === item.play ? 'is-active' : ''
    },
    clickHandle (item) {
      if (item.child) {
        if (item.child[0].play !== this.activeName) {
          this.$emit('tabs-click', item)
        }
      } else {
        if (item.play !== this.activeName) {
          this.$emit('tabs-click', item)
        }
      }
    }
  }
}
</script>

