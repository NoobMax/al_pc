<template>
<transition name="el-fade-in-linear">
  <div class="tutorial-dialog" v-show="visible">
    <div class="tutorial-dialog__mask"></div>
    <div class="tutorial-dialog__content">
    <div class="tutorial-dialog__img" @click="close" :class="type=== 'ios' ? 'is-ios' : 'is-adrid'" />
    </div>
  </div>
</transition>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  mounted () {
    document.addEventListener('keyup', (e) => {
      if (this.visible) {
        if (e.keyCode === 27) {
          this.$emit('close')
        }
      }
    })
  }
}
</script>
