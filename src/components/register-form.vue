<template>
  <el-dialog title="会员注册" :visible="visible" custom-class="form-dialog" :close-on-click-modal="false" @close="close">
    <el-form :rules="rules" ref="registForm" :model="registeForm" class="form-dialog__body" @submit.stop.prevent="submit">
      <el-form-item prop="username">
        <el-input placeholder="用户账号(6-15英文数字)" v-model="registeForm.username" @keyup.13="submit">
          <i slot="prefix" class="icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="登录密码(6-15英文数字)" type="password" v-model="registeForm.password" @keyup.13="submit">
          <i slot="prefix" class="icon-pwd"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="passwordre">
        <el-input placeholder="确认密码(6-15英文数字)" type="password" v-model="registeForm.passwordre" @keyup.13="submit">
          <i slot="prefix" class="icon-pwd-re"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="realName">
        <el-input placeholder="真实姓名(与银行卡户名一致)" v-model="registeForm.realName" @keyup.13="submit">
          <i slot="prefix" class="icon-realname"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-input>
          <i slot="prefix" class="icon-pay"></i>
        </el-input> -->
        <div class="form-payPassword">
          <i class="icon-pay"></i>
          <div>
            <select class="form-select" v-model="payFirst">
              <option :value="i" v-for="i in numbers">{{i}}</option>
            </select>
            <select class="form-select" v-model="paySecond">
              <option :value="i" v-for="i in numbers">{{i}}</option>
            </select>
            <select class="form-select" v-model="payThree">
              <option :value="i" v-for="i in numbers">{{i}}</option>
            </select>
            <select class="form-select" v-model="payFour">
              <option :value="i" v-for="i in numbers">{{i}}</option>
            </select>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <button class="btn-block__default btn-block__submit"  type="submit" @click.stop.prevent="submit('registForm')">提交</button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import api from '@/api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const checkUserName = (rule, username, callback) => {
      if (!username) {
        return callback(new Error('用户名不能为空'))
      }
      if (!/^[A-Za-z0-9]{6,15}$/.test(username)) {
        return callback(new Error('用户名格式不对'))
      }
      api.checkName({username}).then(data => {
        if (data.data && data.data.httpCode === 2004) {
          return callback(new Error('用户名已存在'))
        } else if (data.data && data.data.httpCode === 534) {
          return callback()
        } else {
          return callback(new Error('network error'))
        }
      })
    }
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      if (!/^[A-Za-z0-9]{6,15}$/.test(value)) {
        return callback(new Error('密码格式不对'))
      }
      callback()
    }
    const checkPasswordre = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('确认密码不能为空'))
      }
      if (value !== this.registeForm.password) {
        return callback(new Error('与上面密码不一致'))
      }
      callback()
    }
    const checkRealName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      }
      if (!/^[\u4E00-\u9FA5A]{2,5}$/.test(value)) {
        return callback(new Error('必须为2-5中文'))
      }
      callback()
    }
    return {
      registeForm: {
        username: '',
        password: '',
        realName: '',
        passwordre: ''
      },
      payFirst: '0',
      paySecond: '0',
      payThree: '0',
      payFour: '0',
      rules: {
        username: [
          {validator: checkUserName, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        passwordre: [
          {validator: checkPasswordre, trigger: 'blur'}
        ],
        realName: [
          {validator: checkRealName, trigger: 'blur'}
        ]
      },
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  computed: {
    form () {
      const {username, password, realName} = this.registeForm
      const {payFirst, paySecond, payThree, payFour} = this
      return {
        username,
        password,
        realName,
        payPassword: `${payFirst}${paySecond}${payThree}${payFour}`
      }
    }
  },
  methods: {
    close () {
      this.$refs.registForm.resetFields()
      this.$emit('close-handle')
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit-handle', this.form)
          return false
        }
      })
    }
  }
}
</script>

