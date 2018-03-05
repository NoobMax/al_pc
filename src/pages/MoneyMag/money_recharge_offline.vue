<template>
  <div class="money-recharge__current">
    <div class="offline-bank-content">
        <div>
            <el-table
                :data="tableData"
                stripe
                size="small"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="汇款详细账户资料"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="value"
                    label=""
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="copy"
                    align="right"
                    label="">
                    <template slot-scope="scope">
                      <!-- <a href="javascript:void(0);" :id="scope.row.id">✔</a> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="offline-bank__hint">
            <h4 id="target">温馨提示：</h4>
            <p>一、请在金额转出之后务必填写网页下方的汇款信息表格，以便我们财务人员能及时为您确认添加金额到您的会员账户。</p>
            <p>二、本公司最低存款金额为100元。</p>
            <p>此存款信息只是您汇款详情的提交，并非代表存款，您需要自己通过ATM或网银转帐到本公司提供的账户后，填写提交此信息，待工作人员审核充值！</p>

        </div>
        <div class="money-banks__content">
          <div class="money-banks__heading">
            <h4>付款方信息</h4>
          </div>
            <el-form ref="offBankForm" :model="offBankForm" :rules="offBankRules" label-width="140px" size="small">
                <el-form-item label="用户姓名：" prop="user">
                    <el-input v-model="offBankForm.user" size="small" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="存款金额：" prop="amount">
                    <el-input v-model="offBankForm.amount" size="small" type="number" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="汇款日期时间：" prop="createdTime">
                    <el-date-picker
                        size="small"
                        v-model="offBankForm.createdTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单号后四位：" prop="businessCode">
                   <el-input v-model="offBankForm.businessCode" size="small" type="number" :maxlength="4" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 100px;" class="offline-banks__form">
                    <button class="btn-inline__default betArea-btnGroup__submit" @click.prevent="submitForm('offBankForm')">
                        提交
                    </button>
                    <button class="btn-inline__default betArea-btnGroup__reset" @click.prevent="reset">重置
                    </button>
                </el-form-item>
            </el-form>
        </div>
         <div class="offline-bank__hint">
            <h4 id="target">汇款信息提交说明：</h4>
            <p>(1).请按表格填写准确的汇款转账信息,确认提交后相关财务人员会即时为您查询入款情况。 </p>
            <p>(2).请您在转账金额后面加个尾数,例如:转账金额 1000.66 或 1000.88 等,以便相关财务人员更快确认您的转账金额并充值。 </p>
            <p>(3).如有任何疑问,您可以联系在线客服,在线客服为您提供365天×24小时不间断的友善和专业客户咨询服务。</p>

        </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import api from '@/api'
export default {
  computed: {
    ...mapGetters([
      'paymentList'
    ])
  },
  data () {
    const checkUser = (rule, value, callback) => {
      if (!value || value.length < 2 || value.length > 5 || !/[\u4E00-\u9FA5A]/.test(value)) {
        return callback(new Error('请输入2-5位中文名'))
      }
      return callback()
    }
    return {
      payTypeList: [],
      currentBank: {},
      tableData: [{
        name: '银 行',
        value: '',
        copy: '点击复制',
        id: 'copybank'
      }, {
        name: '开户名',
        value: '',
        copy: '点击复制',
        id: 'copyname'
      }, {
        name: '银行账号',
        value: '',
        copy: '点击复制',
        id: 'copynumber'
      }],
      offBankForm: {
        user: '',
        createdTime: '',
        amount: '',
        businessCode: ''
      },
      offBankRules: {
        user: [
          {validator: checkUser, trigger: 'change'}
        ],
        businessCode: [
          {required: true, message: '请输入卡号', trigger: 'change'},
          {max: 4, min: 4, message: '只能输入4位', trigger: 'change'}
        ],
        createdTime: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
        amount: [
          {required: true, message: '请输入金额', trigger: 'change'},
          {min: 3, message: '最少充值100', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    filterParams () {
      return Object.assign({}, this.current.channel, this.offBankForm, {
        offlinePayId: Number(this.$route.params.id),
        cardCode: this.current.channel.code
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.submitOfflinePay(this.filterParams()).then(data => {
            if (data.data && data.data.httpCode === 200) {
              this.$swal({
                position: 'center',
                type: 'success',
                title: '订单提交成功',
                showConfirmButton: false,
                timer: 1500
              })
            } else if (data.data && data.data.httpCode === 545) {
              this.$swal({
                position: 'center',
                type: 'info',
                title: '存在未审核的订单',
                showConfirmButton: false,
                timer: 1500
              })
            }
            this.$refs.offBankForm.resetFields()
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    reset () {
      this.$refs.offBankForm.resetFields()
    },
    fetchPayment () {
      const {id} = this.$route.params
      const {paymentList} = this.$store.getters
      return paymentList.find(item => item.id === Number(id) && !item.online)
    }
  },
  created () {
    if (this.$store.getters.paymentList.length === 0) {
      this.$store.dispatch('fetchPaymentList', {pageNo: 1, pageSize: -1}).then(() => {
        this.current = this.fetchPayment()
        if (this.current) {
          this.tableData[0].value = this.current.channel.address
          this.tableData[1].value = this.current.channel.user
          this.tableData[2].value = this.current.channel.code
        }
      })
    } else {
      this.current = this.fetchPayment()
      if (this.current) {
        this.tableData[0].value = this.current.channel.address
        this.tableData[1].value = this.current.channel.user
        this.tableData[2].value = this.current.channel.code
      }
    }
    // this.$store.dispatch('fetchRechargeData').then(() => {
    //   const {rechargeData} = this.$store.getters
    //   let detail = _.get(rechargeData, ['1', 'detail'])
    //   let data = _.find(detail, ['detail.bank.bank_id', Number(this.$route.query.uuid)])
    //   this.tableData[0].value = data.detail.bank.bank_name
    //   this.tableData[1].value = data.detail.offline_holder
    //   this.tableData[2].value = data.detail.offline_account
    //   this.tableData[3].value = '赶紧打钱！'
    //   this.offBankForm.amount = this.$route.query.money
    //   this.offBankForm.payment = data.payment_id
    // })
  }
}
</script>

