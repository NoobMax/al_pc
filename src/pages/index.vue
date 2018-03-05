<template>
  <div class="cp-home__container">
    <div class="cp-index">
      <div class="cp-carousel">
        <index-carousel :list="carouselList" type="card" />
      </div>
      <div class="cp-banner">
        <div class="cp-banner__left">
          <div class="cp-banner__ag" @click="getmedia">
            
          </div>
          <div class="cp-banner__mg" @click="$swal({type: 'error',title: '即将上线',timer: 1500})">
            
          </div>
        </div>
        <div class="cp-banner__middle" @click="$swal({type: 'error',title: '请登录会员后再体验',timer: 1500})"></div>
        <div class="cp-banner__right">
          <div class="cp-banner__qscode">
            <div class="cp-banner__qscode-media"></div>
            <div class="cp-banner__qscode-text">
              更新时间 ：2017-11-12
            </div>
          </div>
          <div class="cp-banner__action">
            <div class="cp-banner__action-item" @click="openTutorial('ios')">
              苹果教程
            </div>
            <div class="cp-banner__action-item" @click="openTutorial('and')">
              安卓教程
            </div>
          </div>
        </div>
      </div>
      <div class="cp-small__logo">
        <div class="cp-small__logo-img"></div>
      </div>
    </div>
    <tutorial-dialog :type="tutorialType" :visible="tutorialOpen"  @close="close"/> 
  </div>
</template>
<script>
import tutorialDialog from '@/components/tutorial-dialog'
import indexCarousel from '@/components/index-carousel'
import api from '@/api'
import store2 from 'store2'
export default {
  components: {
    indexCarousel,
    tutorialDialog
  },
  data () {
    return {
      carouselList: [],
      tutorialType: 'ios',
      tutorialOpen: false
    }
  },
  methods: {
    getmedia () {
      store2.session.get('user-info') ? this.$router.push('/media') : this.$swal({
        type: 'error',
        title: '请登录会员后再体验',
        timer: 1500
      })
    },
    openTutorial (type) {
      this.tutorialType = type
      this.tutorialOpen = true
    },
    close () {
      this.tutorialOpen = false
    },
    // 请求数据
    fetchCarousel () {
      api.getCarouselList().then(data => {
        if (data.data && data.data.httpCode === 200) {
          this.carouselList = data.data.response
        }
      })
    }
  },
  created () {
    this.fetchCarousel()
  }
}
</script>
