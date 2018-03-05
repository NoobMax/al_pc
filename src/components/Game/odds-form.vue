<template>
   <div class="betArea-action">
      <div class="betArea-action__fast">
        <div class="betArea-action__default">
          <el-checkbox type="checkbox" :checked="setDefault" @change="checkboxChange" :disabled="setBoxDisabled">预设金额</el-checkbox>
          <el-input size="mini" type="number" @keypress.native="keypress" :value="presetMoney" @input="input" class="default-small" />
        </div>
      </div>
      <div class="betArea-action__btnGroup">
        <button class="btn-inline__default betArea-btnGroup__submit" type="button" :disabled="betClose" @click="submit">确定</button>
        <button class="btn-inline__default betArea-btnGroup__reset" type="button" @click="restOdds">重置</button>
      </div>
  </div>
</template>
<script>
import {isDouble, limitBetNumber} from '@/utils'
import {mapGetters} from 'vuex'
import inputMixins from '@/mixins/input'
export default {
  mixins: [inputMixins],
  props: {
    betClose: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'oddsList',
      'submitDialogVisible',
      'presetMoney'
    ]),
    setBoxDisabled () {
      return !this.presetMoney
    },
    setDefault () {
      return this.presetMoney !== ''
    }
  },
  data () {
    return {
      // setDefault: false
    }
  },
  methods: {
    checkboxChange (value) {
      if (!value) {
        this.$store.commit('set_preset_money', '')
      }
    },
    input (value) {
      this.$store.commit('set_preset_money', value)
      this.$store.commit('set_double_money', value)
    },
    submit () {
      const {play} = this.$route.query
      this.isPick = isDouble(play)
      if (this.oddsList.length === 0) {
        this.$swal({
          type: 'error',
          title: '请选择下注项目',
          timer: 1500
        })
      } else {
        if (this.isPick) {
          const round = this.oddsList[0].round
          if (round.length < limitBetNumber(play).min || round.length > limitBetNumber(play).max) {
            this.$swal({
              type: 'error',
              title: `投注范围在${limitBetNumber(play).min} ~ ${limitBetNumber(play).max} 之间`,
              timer: 1500
            })
            return false
          }
        }
        this.$emit('submit-handle')
      }
    },
    restOdds () {
      if (this.oddsList.length > 0) {
        this.$emit('reset-handle')
      }
    }
  },
  watch: {
    submitDialogVisible (val) {
      if (val) {
        this.submit()
      }
    }
  }
}
</script>

