<template>
  <el-carousel :interval="6000" height="490px" trigger="click">
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <img v-lazy="item.imageUrl" style="max-width: 100%; height: auto;"/>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

