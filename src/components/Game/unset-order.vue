<template>
  <div class="unset-order__item">
   <div class="unset-order__media">
     <img v-lazy="setImg" alt="">
   </div>
   <div class="unset-order__content">
     <div class="unset-order__title">
       <span>{{current.games}}</span>
     </div>
     <div class="unset-order__date">
       <span>时间：{{$dateFormat(current.createdTime * 1000, 'yyyy-dd-mm HH:mm:ss')}}</span>
     </div>
     <div class="unset-order__number">
       <span>注数：{{current.countPay}}注</span> 
     </div>
     <div class="unset-order__number">
      <span>注额：{{current.money}}</span> 
     </div>
     <div class="unset-order__number">
      <span>可赢：{{current.win}}</span>
     </div>
   </div>
  </div>
</template>
<script>
import {lotteryList} from '@/config/lottery.conf'
export default {
  props: {
    current: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    setImg () {
      const current = lotteryList.find(item => item.title === this.current.games)
      return current ? current.img : ''
    }
  }
}
</script>
