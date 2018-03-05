<template>
  <div class='history__number-style-picker'>
    <span :class='{active: resultStyle === "number"}' @click="updateResultStyle('number')"> 显示号码 </span>
    <span :class='{active: resultStyle === "bigSmall"}' @click="updateResultStyle('bigSmall')"> 显示大小 </span>
    <span :class='{active: resultStyle === "oddEven"}' @click="updateResultStyle('oddEven')"> 显示单双 </span>
  </div>
</template>
<script>
export default {
  props: ['resultStyle'],
  data () {
    return {
    }
  },
  methods: {
    updateResultStyle (style) {
      this.$emit('update:resultStyle', style)
    }
  }
}
</script>
