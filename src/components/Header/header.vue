<template>
  <header class="cp-header">
    <div class="header-left">
      <i></i>
    </div>
    <div class="header-middle">
      <header-menu :list="userInfo.sessionId ? headerList : loginOutHeaderList" @regist="action('registForm')" :user-info="userInfo"/>
    </div>
    <div class="header-right">
      <div class="header-right__userinfo" v-if='userInfo.sessionId'>
        <div class="header-right__userinfo-avatar">
          <img :src="$getPublicImg('/img/pc/static/images/common/icon/avatar-defalut-s.png')" alt="">
        </div>
        <div class="header-right__userinfo-content">
          <p>{{userInfo.username || '游客'}}</p>
          <span>¥{{' ' + (userInfo.balance || 0)}}</span>
        </div>
        <div class="header-right__userinfo-action">
          <el-dropdown trigger="click" :show-timeout="150" @visible-change="(value) => dropdownStatus = value">
            <i class="el-icon-arrow-down" :class="{'is-active': dropdownStatus}"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided @click.native="$router.push({name: 'userset', query: {id: 0}})">会员信息</el-dropdown-item>
              <el-dropdown-item divided @click.native="action('loginUpdateForm')">修改登录密码</el-dropdown-item>
              <el-dropdown-item divided @click.native="action('payUpdateForm')">修改支付密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          
        </div>
      </div>
      <ul class="header-right__money" v-if="userInfo.sessionId">
        <li class="header-right-money__item">
          <a href="#" @click.prevent="goToMoney('/home/money/recharge')">
            <img :src="$getPublicImg('/img/pc/static/images/common/icon/ico-my-in-h.png')" alt="">
            <p>充值</p>
          </a>
        </li>
        <li class="header-right-money__item">
          <a href="#" @click.prevent="goToMoney('/home/money/withdrawal')">
            <img :src="$getPublicImg('/img/pc/static/images/common/icon/ico-my-out-h.png')" alt="">
            <p>提现</p>
          </a>
        </li>
        <li class="header-right-money__item ">
          <a href="#" @click.prevent="goToMoney('/home/money/transform')">
            <img :src="$getPublicImg('/img/pc/static/images/common/icon/ico-my-tran-h.png')" alt="">
            <p>转额</p>
          </a>     
        </li>
        <li class="header-right-money__item login-out" @click="loginout" style='cursor:pointer'>
            <img :src="$getPublicImg('/img/pc/static/images/common/icon/tuichu1.png')" alt="">
            <p>登出</p>
        </li>
      </ul>
      <div class="header-right__btnGroup" v-else>
        <header-form @login-handle="loginClick" @regist-handle="registFromHandle"></header-form>
        <div class="header-from__btnGroup" style='float:right;'>
          <p style='margin-right:3px;cursor:pointer;font-size:12px;' @click='tryClickHandle'>试玩入口</p>         
           <!-- <a href="#" class="btn-guest" @click.prevent="guest">代理登录</a> -->
        </div>  
      </div>
    </div>
    <component :is="currentView" 
    @submit-handle="submitHandle" @close-handle="close" :visible="visible"/>
    <agreement :visible="isLogin" @close='agreenclose' @agreen='agreen' :user-info='userData'></agreement>
  </header>
</template>
<script>
import api from '@/api'
import store2 from 'store2'
import headerForm from './header-form'
import headerMenu from './header-menu'
import agreement from './agreement'
import {headerList, loginOutHeaderList} from '@/config/header.conf'
import registForm from '@/components/register-form'
import loginUpdateForm from '@/components/login-update-form'
import payUpdateForm from '@/components/pay-update-form'
import {mapGetters} from 'vuex'
export default {
  components: {
    headerMenu,
    headerForm,
    registForm,
    loginUpdateForm,
    payUpdateForm,
    agreement
  },
  data () {
    return {
      headerList,
      loginOutHeaderList,
      isLogin: false,
      visible: false,
      currentView: '',
      dropdownStatus: false,
      userData: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    registFromHandle () {
      this.action('registForm')
    },
    goToMoney (path) {
      if (this.userInfo && this.userInfo.guest === 1) {
        this.$router.push(path)
      } else {
        this.$swal({
          type: 'info',
          title: '请登录正式账号操作',
          timer: 1500
        })
      }
    },
    // 对话框同意
    agreen () {
      this.isLogin = false
      store2.session.set('user-info', Object.assign({}, this.userData, {usersId: this.userData.id}))
      this.$store.commit('receive_user_info')
      this.$router.push({name: 'games_pk10', query: {play: '17'}})
    },
    agreenclose (data) {
      this.isLogin = data
    },
    close () {
      this.visible = false
    },
    // 注册
    regist (form) {
      api.regist(form).then(data => {
        this.handleLoading.close()
        if (data.data && data.data.httpCode === 532) {
          this.visible = false
          this.isLogin = true
          this.userData = Object.assign({}, data.data.response[0])
        }
      }).catch(() => {
        this.handleLoading.close()
      })
    },
    // 修改密码
    updatePwd (form) {
      api.updatePassword(form).then(data => {
        this.handleLoading.close()
        if (data.data && data.data.httpCode === 200) {
          this.visible = false
          this.loginoutData()
        }
      }).catch(() => {
        this.handleLoading.close()
      })
    },
    // 修改支付密码
    updatePayPwd (form) {
      api.updatePayPassword(form).then(data => {
        this.handleLoading.close()
        if (data.data && data.data.httpCode === 200) {
          this.visible = false
          this.$swal({
            type: 'success',
            title: '修改成功'
          })
          this.$store.commit('clear_user_info')
          this.$router.replace('/')
        }
      }).catch(() => {
        this.handleLoading.close()
      })
    },
    // 提交
    submitHandle (form) {
      this.handleLoading = this.$loading({
        lock: true
      })
      if (this.currentView === 'registForm') {
        this.regist(form)
      } else if (this.currentView === 'loginUpdateForm') {
        this.updatePwd(form)
      } else if (this.currentView === 'payUpdateForm') {
        this.updatePayPwd(form)
      }
    },
    // dialog
    action (currentView) {
      if (currentView === 'loginUpdateForm' || currentView === 'payUpdateForm') {
        if (this.userInfo && this.userInfo.guest === 1) {
          this.currentView = currentView
          this.visible = true
        } else {
          this.$swal({
            type: 'info',
            title: '请登录正式账号操作',
            timer: 1500
          })
        }
      } else {
        this.currentView = currentView
        this.visible = true
      }
    },
    // 试玩
    tryClickHandle () {
      const loading = this.$loading({
        lock: true
      })
      api.guest().then(data => {
        loading.close()
        if (data.data && data.data.httpCode === 515) {
          this.isLogin = true
          this.userData = Object.assign({}, data.data.response[0])
        }
      }).catch(() => {
        loading.close()
      })
    },
    // 登出 api
    loginoutData () {
      api.esc().then(data => {
        if (data.data && data.data.httpCode === 200) {
          this.$swal({
            position: 'center',
            type: 'success',
            title: '登出成功',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.commit('clear_user_info')
          this.$router.replace('/')
        }
      })
    },
    // 登出
    loginout () {
      this.$swal({
        text: '确定要登出吗？',
        type: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: '确定登出',
        cancelButtonText: '取消操作'
      }).then((result) => {
        if (result.value) {
          this.loginoutData()
        }
      })
    },
    // 登录
    loginClick (form) {
      const loading = this.$loading({
        lock: true
      })
      api.login(form).then(data => {
        loading.close()
        if (data.data && data.data.httpCode === 515) {
          this.isLogin = true
          this.userData = Object.assign({}, data.data.response[0])
        }
      }).catch(() => {
        loading.close()
      })
    }
  },
  created () {
    this.$store.commit('receive_user_info')
  }
}
</script>
