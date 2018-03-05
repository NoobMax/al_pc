<template>
    <div class="home-wrapper__content animated fadeIn">
        <div class="home-wrapper__title">
            <h4>资金管理</h4>
        </div>
        <money-header :user-info="userInfo"/>
        <money-menu :menu-list="menuList"/>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import moneyHeader from '@/components/user-header'
  import moneyMenu from '@/components/MoneyMan/menu'
  import {menuList} from '@/config/money.conf'

  export default {
    components: {
      moneyHeader,
      moneyMenu
    },
    data () {
      return {
        activeRoute: '/money/recharge',
        menuList
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      getActivePath (path) {
        if (path.includes('/money/recharge')) {
          return '我要充值'
        }
        if (path.includes('/money/withdrawal')) {
          return '我要提现'
        }
        if (path === '/money/history') {
          return '交易记录'
        }
        return ''
      }
    },
    watch: {
      $route (activeRoute) {
        this.activeRoute = activeRoute.path
        this.title = this.getActivePath(this.activeRoute)
      }
    },
    created () {
      this.title = this.getActivePath(this.$route.path)
      this.activeRoute = this.$route.path
      this.$store.commit('receive_user_info')
    }
  }
</script>

