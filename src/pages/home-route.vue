<template>
  <div class="cp-home__container">
    <div class="cp-menu" :style="isCollapse ? {width: '70px'} : {width: '180px'}">
        <div class="cp-menu__firstTitle">
          <span v-show="!isCollapse">热门彩票</span>
          <a href="#" :class="!isCollapse ? 'open' : 'close'"></a>
        </div>
        <el-menu
        :default-active="`${subRoute}${activeRoute}`"
        class="el-menu-vertical"
        background-color="transparent"
        router
        @select="switchRoute"
        >
        <el-menu-item index="/home/games/pk10?play=17" :style="computedMenuItemStyle" :class="{'is-active': activeRoute === 'pk10'}">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'pk10' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-pk10" :class="computedIconClass('pk10')"></i>
            <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'pk10' ? 'cp-menu-title__active' : ''">北京赛车 <br><span class="cp-menu__word"> BEIJING PK10</span></span>
        </el-menu-item>
        <el-menu-item index="/home/games/cqssc?play=20" :style="computedMenuItemStyle" :class="{'is-active': activeRoute === 'cqssc'}">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'cqssc' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-cqssc" :class="computedIconClass('cqssc')"></i>
            <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'cqssc' ? 'cp-menu-title__active' : ''">重庆时时彩 <br><span class="cp-menu__word"> COLORED TIMES</span></span>
        </el-menu-item>
        <el-menu-item index="/home/games/marksix?play=2251" :style="computedMenuItemStyle">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'marksix' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-lhc" :class="computedIconClass('marksix')"></i>
          <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'marksix' ? 'cp-menu-title__active' : ''">香港六合彩 <br><span class="cp-menu__word"> HK MARK SIX</span></span>
        </el-menu-item>
        <el-menu-item index="/home/games/pcegg?play=111" :style="computedMenuItemStyle">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'pcegg' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-pcegg" :class="computedIconClass('pcegg')"></i>
          <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'pcegg' ? 'cp-menu-title__active' : ''">PC蛋蛋 <br><span class="cp-menu__word"> PC EGG</span></span>
        </el-menu-item>
        <el-menu-item index="/home/games/xyft?play=27" :style="computedMenuItemStyle">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'xyft' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-xyft" :class="computedIconClass('xyft')"></i>
          <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'xyft' ? 'cp-menu-title__active' : ''">幸运飞艇 <br><span class="cp-menu__word"> AIR SHIP</span></span>
        </el-menu-item>
        <el-menu-item index="/home/games/klsf?play=31" :style="computedMenuItemStyle">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'klsf' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-klsf" :class="computedIconClass('klsf')"></i>
          <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'klsf' ? 'cp-menu-title__active' : ''">广东快乐十分 <br><span class="cp-menu__word"> HAPPY 10</span></span>
        </el-menu-item>
        <el-menu-item index="/home/games/xync?play=42" :style="computedMenuItemStyle">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'xync' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-xync" :class="computedIconClass('xync')"></i>
          <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'xync' ? 'cp-menu-title__active' : ''">重庆幸运农场 <br><span class="cp-menu__word"> LUCKY FARM</span></span>
        </el-menu-item>
        <el-menu-item index="/home/games/dice?play=66" :style="computedMenuItemStyle">
          <i class="triangle-icon__default cp-menu__triangle" :class="activeRoute === 'dice' ? 'cp-menu-triangle__active' : ''" v-show="!isCollapse"></i>
          <i class="cp-icon-dice" :class="computedIconClass('dice')"></i>
          <span v-show="!isCollapse" class="cp-menu__title" :class="activeRoute === 'dice' ? 'cp-menu-title__active' : ''">江苏骰宝（快3） <br><span class="cp-menu__word"> JS Sic Bo</span></span>
        </el-menu-item>
      </el-menu>
      </div>
      <div class="cp-home__main">
        <router-view></router-view>
      </div>
      <unset-dialog :is-collapse="cartIsCollapse" @collapse="cartIsCollapse = !cartIsCollapse"/>
  </div>
</template>
<script>
import config from '@/config'
import unsetDialog from '@/components/unset-dialog'
import {mapGetters} from 'vuex'
export default {
  components: {
    unsetDialog
  },
  data () {
    return {
      isCollapse: false,
      activeRoute: 'pk10',
      subRoute: '/home/games/',
      cartIsCollapse: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    // 计算menuitem 的样式
    computedMenuItemStyle () {
      return !this.isCollapse ? {paddingLeft: '10px', justifyContent: 'flex-start'} : {paddingLeft: 0, justifyContent: 'center'}
    }
  },
  methods: {
    switchRoute (path) {
      this.activeRoute = path.substr(path.lastIndexOf('/') + 1).split('?')[0]
    },
    // 计算icon的class
    computedIconClass (lottery) {
      if (this.activeRoute === lottery) {
        return 'cp-icon-menu__active'
      } else {
        if (this.isCollapse) {
          return 'is-collapse'
        }
      }
      return ''
    }
  },
  watch: {
    $route (route, oldRoute) {
      if (route.name !== oldRoute.name) {
        this.activeRoute = this.$route.meta.name
      }
    }
  },
  created () {
    this.$store.commit('receive_user_info')
    this.activeRoute = this.$route.meta.name
    const io = new WebSocket(`ws://${config.socketApi}/websocket?token=${this.userInfo.sessionId}&userid=${this.userInfo.usersId}`)
    io.onmessage = (data) => {
      if (data.data) {
        const result = JSON.parse(data.data)
        if (result.status === 200 && result.payload) {
          this.$store.commit('update_user_balance', {balance: result.payload})
        }
      }
    }
    io.onclose = (e) => {
      io.close()
    }
  }
}
</script>
<style>
</style>

