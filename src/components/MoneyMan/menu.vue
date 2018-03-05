<template>
  <ul class="money-menu__list">
    <li v-for="(item, index) in menuList" :key="index" class="money-menu__item" :class="formatClass(item)">
      <router-link :to="item.path"  active-class="is-active">{{item.title}}</router-link>
      <i class="triangle-icon__default"></i>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    menuList: {
      type: Array
    }
  },
  methods: {
    formatClass (item) {
      return this.$route.path.includes(item.path) ? 'is-active' : ''
    }
  }
}
</script>

