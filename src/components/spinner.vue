<template>
<div class="spinner-wrapper" v-show="loading">
  <div class="spinner-mask"></div>
    <div class="spinner-content">
      <scale-loader :loading="loading" :color="color" ></scale-loader>
    </div>
</div>
</template>
<script>
// import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
export default {
  components: {
    // ScaleLoader
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#3e80d4'
    }
  }
}
</script>



