<template>
<el-form class="header-form" @submit.stop.prevent="login">
  <div class='form-val'>
    <el-input size="mini" class='f-l'  v-model="username" @keyup.17="login" placeholder="会员账号"></el-input>
    <el-input size="mini" class='f-l' type="password" v-model="password" @keyup.17="login" placeholder="登录密码"></el-input>
  </div>
  <div class='btn-group'>
    <button  class="btn-inline__default btn-login" type="submit" @click.prevent="login">登录</button>
    <button  class="btn-inline__default btn-guest" @click.prevent="registe" >注册</button>
  </div>
</el-form>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    form () {
      return {
        username: this.username,
        password: this.password
      }
    }
  },
  methods: {
    checkStatus () {
      if (!this.username || !this.password) {
        return false
      }
      return true
    },
    login () {
      if (this.checkStatus()) {
        this.$emit('login-handle', this.form)
      } else {
        this.$swal({
          type: 'error',
          title: '账号或密码格式不正确',
          timer: 1500
        })
      }
    },
    registe () {
      this.$emit('regist-handle')
    }
  }
}
</script>

