<template>
    <div class="bank-money-recharge">
        <div class="bank-money-input">
            <span class="bank-money-input__icon">￥</span>
            <input :type="type" :name="name" :value="inputValue" @focus="focusHandle" @blur="blurHandle"
                   @change="handleChange" @keypress="keypress" :maxlength="max"
                   @input="inputHandle">
            <i class="bank-money-input__clear el-icon-circle-close" @click="clearValue"></i>
        </div>
        <div class="bank-money-hint" v-show="showHint">
        <span>单笔下限 <span style="color: #eb6877">10</span>, 单笔上限 <span
            style="color: #eb6877">1000,000</span> </span>
            <div class="triangle-icon__default money-hint__triangle"></div>
        </div>
    </div>
</template>
<script>
import inputMixins from '@/mixins/input'
export default {
  mixins: [inputMixins],
  props: {
    showHint: {
      type: Boolean,
      default: true
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    max: {
      type: Number,
      default: 8
    },
    value: {}
  },
  data () {
    return {
      inputValue: this.value
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('change', e.target.value)
    },
    focusHandle (event) {
      this.$emit('focus', event)
    },
    blurHandle (event) {
      this.$emit('blur', event)
    },
    inputHandle (val) {
      this.inputValue = val.target ? val.target.value : val
    },
    clearValue () {
      this.$emit('clear', true)
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
    .bank-money-input {
        position: relative;
        display: flex;
        align-items: center;
        .bank-money-input__icon {
            font-size: 26px;
            color: #7b73be;
            position: absolute;
        }
        input {
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid rgb(221, 221, 221);
            color: #7b73be;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 1;
            outline: none;
            font-size: 22px;
            padding: 0 24px;
            width: 220px;
        }
        .bank-money-input__clear {
            display: inline-block;
            font-size: 22px;
            position: absolute;
            left: 194px;
            cursor: pointer;
            // background: url('../../assets/images/money_clear.png') no-repeat;
        }
    }
</style>
