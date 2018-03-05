<template>
  <el-dialog title="修改支付密码" :visible="visible" custom-class="form-dialog" :close-on-click-modal="false" @close="close">
    <el-form :rules="rules" ref="payForm" :model="payForm" class="form-dialog__body" @submit.stop.prevent="submit">
      <el-form-item prop="oldPayPassWord">
        <el-input placeholder="旧支付密码(4位数字)" type="password" :maxlength="4" v-model="payForm.oldPayPassWord" @keyup.13="submit">
          <i slot="prefix" class="icon-pwd-old"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="payPassWord">
        <el-input placeholder="新支付密码(4位数字)" type="password" :maxlength="4" v-model="payForm.payPassWord" @keyup.13="submit">
          <i slot="prefix" class="icon-pwd-new"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <button class="btn-block__default btn-block__submit"  type="submit" @click.stop.prevent="submit('payForm')">确认修改</button>
      </el-form-item>
    </el-form>
    <div class="form-dialog__footer">
    <span>有疑问？</span>
    <router-link to="">联系客服</router-link>&nbsp;
  </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const checkOldPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('旧密码不能为空'))
      }
      if (!/^[0-9]{4}$/.test(value)) {
        return callback(new Error('旧密码格式不对'))
      }
      callback()
    }
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新密码不能为空'))
      }
      if (!/^[0-9]{4}$/.test(value)) {
        return callback(new Error('新密码格式不对'))
      }
      if (value === this.payForm.oldPayPassWord) {
        return callback(new Error('新旧密码不能一致'))
      }
      callback()
    }
    return {
      payForm: {
        oldPayPassWord: '',
        payPassWord: ''
      },
      rules: {
        oldPayPassWord: [
          {validator: checkOldPwd, trigger: 'blur'}
        ],
        payPassWord: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    close () {
      this.$refs.payForm.resetFields()
      this.$emit('close-handle')
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit-handle', this.payForm)
          return false
        }
      })
    }
  }
}
</script>

