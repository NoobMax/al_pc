<template>
  <div id="app" class="client-ct">  
      <div class="cp-header__container">
        <cp-header></cp-header>
      </div>
      <router-view />
      <cp-footer />
  </div>
</template>

<script>
import cpHeader from './components/Header/header'
import cpFooter from './components/footer'
export default {
  components: {
    cpHeader,
    cpFooter
  },
  data () {
    return {
      loading: false
    }
  },
  name: 'app',
  created () {
    setTimeout(() => {
      this.loading = false
    }, 40000000)
  },
  mounted () {
    // const ws = new WebSocket('ws://10.10.20.10:8868/websocket?token=12345678&userid=157')
    // ws.onmessage = (evt) => {
    //   console.log(evt)
    // }
  }
}
</script>
<style lang="scss">
@import './assets/styles/public/public.scss';
@import './assets/styles/public/reset.scss';
@import './assets/styles/public/index.scss';
@import './assets/styles/public/header.scss';
@import './assets/styles/public/history.scss';
@import './assets/styles/public/rules.scss';
@import './assets/styles/public/balanceRecord.scss';
@import './assets/styles/public/menu.scss';
@import './assets/styles/public/nav.scss';
@import './assets/styles/public/betArea.scss';
@import './assets/styles/public/betting.scss';
@import './assets/styles/public/download.scss';
@import './assets/styles/public/userset.scss';
@import './assets/styles/public/form.scss';
@import './assets/styles/public/money.scss';
@import './assets/styles/public/banks.scss';
@import './assets/styles/public/media.scss';
@import './assets/styles/public/agreement.scss';
</style>

