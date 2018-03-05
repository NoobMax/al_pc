<template>
  <div class="money-header">
    <div class="money-header__left">
      <img :src="$getPublicImg('/img/pc/static/images/common/icon/avatar-defalut-s.png')" alt=""/>
    </div>
    <div class="money-header__right">
      <div class="money-header__username money-header__right-item">
        <h5>会员账号：</h5>
        <span>{{userInfo.username}}</span>
      </div>
      <div class="money-header__userstatus money-header__right-item">
        <h5>账户状态：</h5>
        <span>钻石VIP</span>
        <p>已启用</p>  
      </div>
      <div class="money-header__balance money-header__right-item">
        <h5>彩票余额：</h5>
        <span>￥{{userInfo.balance}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  computed: {
    incrementMoney () {
      const {userInfo} = this
      if (userInfo.wallet) {
        return Number(userInfo.wallet.wallet_cash) + Number(userInfo.wallet.wallet_cash_bonus)
      }
      return 0.00
    }
  }
}
</script>
<style lang="scss">
  .money-header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e1e2ef;
    h5 {
      color: #666;
      font-size: 14px;
    }
    @at-root {
      .money-header__left {
        background-color: #2d2d3a;
        display: flex;
        width: 72px;
        height: 72px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        img {
          margin-top: -10px;
        }
      }
      .money-header__right {
        flex: 1;
        margin-left: 20px;
        .money-header__right-item {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
        }
        .money-header__username {
          span {
            color: rgb(69, 56, 128);
          }
        }
        .money-header__userstatus {
          span {
            color: rgb(69, 56, 128);
            margin-right: 6px;
          }
          p {
            color: rgb(63, 128, 212);
          }
        }
        .money-header__balance {
          span {
            color: #eb6877;
          }
        }
      }
    }
  }
</style>


