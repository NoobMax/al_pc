<template>
<el-dialog title="通知" :visible="visible" custom-class="betArea-dialog agreement-dialog" :close-on-click-modal="false" @close="close">
    <div class='agreement-dialog__body'>
      <div class='agreement-content'>
        <div class='agreement-header clearfix'>
            <div class='ico'>
              <img :src='$getPublicImg("/img/pc/static/images/common/icon/avatar-defalut-L.png")' alt="">
            </div>
            <div class='welcome'>
              <p>您好，<span>{{ userInfo && userInfo.username || '游客' }}</span>欢迎来到{{ getTitle }}</p>
              <p>祝您游戏愉快！</p>
            </div>
        </div>
        <div class='agreement-center'>
          <h3>游戏规则</h3>
          <p>1、使用本公司网站的客户，请留意阁下所在的国家或居住地的相关法律规定，如有疑问应就相关问题，寻求当地法律意见。</p>
          <p>2、若发生遭黑客入侵破坏行为或不可抗拒之灾害导致网站故障或资料损坏、资料丢失等情况，我们将以本公司之后备资料为最后处理依据；为确保各方利益，请各会员投注后打印资料。本公司不会接受没有打印资料的投诉。</p>
          <p>3、为避免纠纷，各会员在投注之后，务必进入下注明细检查及打印资料。若发现任何异常，请立即与代理商联系查证，一切投注将以本公司资料库的资料为准，不得异议。如出现特殊网络情况或线路不稳定导致不能下注或下注失败。本公司概不负责。</p>
          <p>4、开奖结果以官方公布的结果为准。</p>
          <p>5、如遇到官方停止销售或者开奖结果不确定的情况，本公司将对相关注单进行无效处理，并且返还下注本金。</p>
          <p>6、我们将竭力提供准确而可靠的开奖统计等资料，但并不保证资料绝对无误，统计资料只供参考，并非是对客户行为的指引，本公司也不接受关于统计数据产生错误而引起的相关投诉。</p>
          <p>7、本公司拥有一切判决及注消任何涉嫌以非正常方式下注之权利，在进行更深入调查期间将停止发放与其有关之任何彩金。客户有责任确保自己的帐户及密码保密，如果客户怀疑自己的资料被盗用，应立即通知本公司，并须更改其个人详细资料。所有被盗用帐号之损失将由客户自行负责。</p>

          <h4>{{ getTitle }}管理层 敬啟</h4>
        </div>
      </div>
      <div class='agreement-footer' style='border-radius:8px'>        
          <button class='btn-inline__default betArea-btnGroup__submit' @click="isAgree('agree')">同意</button>
          <button class='btn-inline__default betArea-btnGroup__reset' @click="isAgree('disagree')">不同意</button>   
      </div>
    </div>
</el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getTitle () {
      return '彩投彩票'
    }
  },
  methods: {
    isAgree (data) {
      if (data === 'agree') {
        this.$emit('agreen')
      }
      this.$emit('close')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
