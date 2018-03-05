<template>
    <div>
        <ul class="money-payType__list">
            <li class="money-payType__item" v-for="(item, index) in payTyprImg" :key="index">
                <div class="money-payType__item-body">
                    <img :src="item.img" alt="">
                    <div>{{item.title}}</div>
                </div>
            </li>
        </ul>
        <div class="cp-money-tabs money-payType__item-footer">
            <ul class="cp-money-tabs__nav">
                <li class="cp-money-tabs__nav-item" v-for="(item, index) in paytypeList" :key="index">
                    <a href="#" @click.prevent.stop="switchRoute(item)" :class="formatClass(item)">
                        {{item.title}}
                    </a>
                </li>
            </ul>
            <div class="money-payType__text">
                <h4>特别提示：</h4>
                <p>请客户在进行存款操作前首先确认持有的银行卡是否具有网上支付功能。若未开通或有其他疑问，请按银行"帮助中心"详细了解及处理。</p>
                <h5>注意事项：</h5>
                <p>1、你所使用的存款银行需要开通网上银行业务。 </p>
                <p>2、当你在存款过程中遇到任何问题，请随联系我们在线客服咨询或邮箱。</p>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
      paytypeList: {
        type: Array,
        default: () => []
      },
      payTyprImg: {
        type: Array,
        default: () => []
      },
      activeId: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      formatClass (item) {
        if (!item.channel) {
          return 'is-disabled'
        } else if (item.label === this.activeId && item.channel) {
          return 'is-active'
        }
        return ''
      },
      switchRoute (item) {
        if (this.activeId !== item.label && item.channel) {
          this.$emit('active-change', item)
        }
      }
    }
  }
</script>
<style lang="scss">
    .cp-money-tabs__nav {
        display: flex;
        align-items: center;
        .cp-money-tabs__nav-item {
            &:nth-of-type(3) {
                margin-left: 16px;
            }
            &:nth-of-type(5) {
                margin-left: 16px;
            }
            &:nth-of-type(7) {
                margin-left: 16px;
            }
            &:nth-of-type(9) {
                margin-left: 16px;
            }
        }
        a {
            display: inline-block;
            width: 124px;
            white-space: nowrap;
            vertical-align: middle;
            background: #fff;
            border: 1px solid #d8dce5;
            font-weight: 500;
            color: #5a5e66;
            -webkit-appearance: none;
            text-align: center;
            transition: all .2s cubic-bezier(.645, .045, .355, 1);
            padding: 12px 0;
            font-size: 14px;
            border-radius: 4px;
            > span {
                margin-right: 4px;
            }
            &:hover {
                background-color: #453880;
                color: #fff;
            }
            &:first-child {
                margin-left: -2px;
            }
            &.is-active {
                background-color: #453880;
                color: #fff;
            }
            &.is-disabled {
                &:hover {
                    color: #c6cad2;
                    cursor: no-drop;
                    background-color: #fff;
                }
                color: #c6cad2;
                cursor: no-drop;
            }
        }
    }
</style>

