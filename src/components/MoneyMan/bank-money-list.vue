<template>
    <div class="bank-money-list">
        <h4>{{title}}</h4>
        <ul class="bank-money-list__nav">
            <li class="bank-money__nav-item" v-for="(item, index) in list" :key="index" :class="formatClass(index)"
                @click="switchRoute(item, index)">
                <template v-if="'title' in item">
                    <img :src="item.img" alt="">
                    <div>{{item.title}}</div>
                </template>
                <span v-else>{{item.money}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default: () => []
      },
      activeMoneyId: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: ''
      }
    },
    methods: {
      formatClass (index) {
        if (this.type === 'money') {
          if (index === this.activeMoneyId) {
            return 'is-active is-money'
          }
          return 'is-money'
        } else {
          if (index === this.activeMoneyId) {
            return 'is-active'
          }
          return ''
        }
      },
      switchRoute (item, index) {
        if (index !== this.activeMoneyId) {
          this.$emit('active-change', item, index)
        }
      }
    }
  }
</script>
<style lang="scss">
    .bank-money-list {
        flex: 1;
        padding: 20px 0;
        h4 {
            padding-left: 20px;
        }
    }
    .bank-money-list__nav {
        display: flex;
        flex-wrap: wrap;
        @at-root {
            .bank-money__nav-item {
                flex: 0 1 18%;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                margin: 10px;
                width: 184px;
                background-color: #fefefe;
                padding: 5px;
                border-radius: 5px;
                cursor: pointer;
                border: 1px solid transparent;
                box-shadow: 2px 1px 4px 0px #a0a0a0;
                &.is-money {
                    flex: 0 1 80px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    justify-content: center;
                    span {
                        color: #666;
                    }
                }
                &:hover {
                    background-color: rgba(254, 254, 254, .8);
                }
                &.is-active {
                    border-color: #eb6877;
                    span {
                        color: #eb6877;
                    }
                }
                img {
                    margin-right: 10px;
                }
            }
        }
    }
</style>


