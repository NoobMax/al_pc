<template>
  <ul>
    <li class="dragon-item" v-for="(item, index) in list" :key="index">
      <p>{{Object.keys(item)[0]}}</p>
      <span>已出{{item[Object.keys(item)[0]]}}期</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

