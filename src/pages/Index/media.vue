<template>
  <div class="media-container">
  <div class='media'>
        <div class='media-logo'>
        </div>
        <div class='media-nav'>
            <p class='media-nav-Balance'>
                AG余额：<span class='media-nav-Balance-span'>0.00</span>
            </p>
            <p @click='operating("recharge")' class='media-nav-Recharge'>AG充值</p>
            <p @click='operating("withdrawal")' class='media-nav-withdraw'>AG体现</p>
            <p @click='operating("transform")' class='media-nav-Conversion'>额度转换</p>
        </div>
        <div class='media-btnGroup'>
            <button class="btn-inline__default betArea-btnGroup__submit media-btn-guest">免费试玩</button>
            <button class="btn-inline__default betArea-btnGroup__reset media-btn-game">立即游戏
              <img v-lazy="require('../../assets/images/public/media/btn-disc.png')" alt="">
            </button>
                <!-- <img v-lazy="require('../../assets/images/public/media/btn-disc.png')" alt=""> -->
        </div>       
  </div>
  </div>
</template>
<script>
export default {
  methods: {
    operating (operating) {
      this.$router.push({ name: operating })
    }
  }
}
</script>