<template>
  <el-radio-group style="margin-top: 5px;" v-model="currentId" @change="radioChange" size="small">
    <el-radio-button v-for="(item, index) in list" :key="index" :label="item.key" v-if="setShow(item)">{{`${item.name} (${item.odds})`}}</el-radio-button>
  </el-radio-group>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      currentId: this.activeId
    }
  },
  watch: {
    activeId (val) {
      this.currentId = val
    }
  },
  filters: {
    formatLabel (name, odds) {
      return `${name} (${odds})`
    }
  },
  methods: {
    setShow (item) {
      return parseFloat(item.odds)
    },
    radioChange (key) {
      const current = this.list.find(item => item.key === key)
      this.$emit('radio-change', key, current)
    }
  }
}
</script>
