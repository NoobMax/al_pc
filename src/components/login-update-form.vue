<template>
  <el-dialog title="修改登录密码" :visible="visible" custom-class="form-dialog" :close-on-click-modal="false" @close="close">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="form-dialog__body" @submit.stop.prevent="submit">
      <el-form-item prop="oldpassword">
        <el-input placeholder="旧密码(6-15英文数字)" type="password" v-model="loginForm.oldpassword" @keyup.13="submit">
          <i slot="prefix" class="icon-pwd-old"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="新密码(6-15英文数字)" type="password" v-model="loginForm.password" @keyup.13="submit">
          <i slot="prefix" class="icon-pwd-new"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <button class="btn-block__default btn-block__submit"  type="submit" @click.stop.prevent="submit('loginForm')">确认修改</button>
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
      if (!/^[A-Za-z0-9]{6,15}$/.test(value)) {
        return callback(new Error('旧密码格式不对'))
      }
      callback()
    }
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新密码不能为空'))
      }
      if (!/^[A-Za-z0-9]{6,15}$/.test(value)) {
        return callback(new Error('新密码格式不对'))
      }
      if (value === this.loginForm.oldpassword) {
        return callback(new Error('新旧密码不能一致'))
      }
      callback()
    }
    return {
      loginForm: {
        oldpassword: '',
        password: '',
        realName: ''
      },
      rules: {
        oldpassword: [
          {validator: checkOldPwd, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    close () {
      this.$refs.loginForm.resetFields()
      this.$emit('close-handle')
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit-handle', this.loginForm)
          return false
        }
      })
    }
  }
}
</script>

