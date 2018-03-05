<template>
  <div class="home-wrapper__content">
    <div class="home-wrapper__title">
      <h4>银行卡管理</h4>
    </div>
     <h4 class="banks-body__hint">为了您的账户安全，真实姓名要与绑定的银行卡姓名一致</h4>
   <div class="banks-body__content">
     <div class="banks-body__heading">
       <span>{{setTitle}}</span>
     </div>
     <el-form ref="bankForm" :model="bankForm" :rules="rulesBank" label-width="100px">
       <el-form-item label="选择银行：" required>
         <el-col :span="7">
         <el-select size="small" v-model="bankForm.id" style="width: 270px">
           <el-option v-for="(item, index) in bankList" :key="index" :label="item.title" :value="item.id">
           </el-option>
         </el-select>
         </el-col>
       </el-form-item>
       <el-form-item label="银行卡号：" prop="bankCardNumbers" required>
         <el-col :span="7">
          <el-input style="width: 270px" size="small" type="number" @keypress.native="keypress" v-model="bankForm.bankCardNumbers"></el-input>
         </el-col>
       </el-form-item>
      <!--  <el-form-item label="重复卡号：" prop="card_no_confirmation" required>
         <el-col :span="7">
          <el-input size="small" v-model="bankForm.card_no_confirmation"></el-input>
         </el-col>
       </el-form-item> -->
       <el-form-item label="开户地址：" prop="bankAddress">
         <el-col :span="7">
          <el-input size="small" style="width: 270px" v-model="bankForm.bankAddress"></el-input>
         </el-col>
       </el-form-item>
        <div class="betArea-action__btnGroup banks-body__btn">
          <button class="btn-inline__default betArea-btnGroup__submit" type="submit" @click.stop.prevent="submit('bankForm')">确定</button>
          <button class="btn-inline__default betArea-btnGroup__reset" type="button" @click.prevent="rest">取消</button>
        </div>
     </el-form>
   </div>
  </div>
</template>
<script>
import api from '@/api'
import {bankList} from '@/config/money.conf'
import inputMixins from '@/mixins/input'
import {mapGetters} from 'vuex'
export default {
  data () {
    let checkCardNo = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入卡号'))
      }
    }
    let checkCardNoRe = (rule, value, callback) => {
      if (this.banksLength > 0) {
        return callback()
      }
      if (value === '') {
        callback(new Error('请再次输入卡号'))
      } else if (value !== this.bankForm.card_no) {
        callback(new Error('两次卡号不一致'))
      } else {
        callback()
      }
    }
    return {
      bankList,
      bankForm: {
        bankAddress: '',
        bankCardNumbers: '',
        card_no_confirmation: '',
        id: 1
      },
      rulesBank: {
        bankCardNumbers: [
          {required: true, trigger: 'blur', message: '请输入卡号'},
          {min: 16, max: 19, trigger: 'blur', message: '请输入16-19位'}
        ],
        bankAddress22: [
          {validator: checkCardNo, trigger: 'blur'}
        ],
        card_no_confirmation: [
          {validator: checkCardNoRe, trigger: 'blur'}
        ],
        bankAddress: [
          {required: true, trigger: 'blur', message: '请输入地址'}
        ]
      }
    }
  },
  mixins: [inputMixins],
  computed: {
    setTitle () {
      return this.$route.query.type === 'add' ? '绑定银行卡' : '修改银行卡'
    },
    ...mapGetters([
      'bankInfo'
    ]),
    params () {
      const {type} = this.$route.query
      const {bankCardNumbers, bankAddress, id} = this.bankForm
      return {
        bankCardNumbers,
        bankAddress,
        bankName: this.bankList.find(item => item.id === id).title,
        bankId: type === 'add' ? '' : this.bankInfo.id
      }
    }
  },
  methods: {
    rest () {
      this.$router.back()
    },
    parseParams () {
      return Object.assign({}, this.bankForm)
    },
    submit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // const loading = getLoadingInstance(this)
          api.addBankInfo(this.params).then(data => {
            // loading.close()
            if (data.data && data.data.httpCode === 528) {
              this.$swal({
                type: 'success',
                title: '添加成功',
                showConfirmButton: false,
                timer: 1500
              })
              this.$router.back()
            } else if (data.data && data.data.httpCode === 519) {
              this.$swal({
                type: 'error',
                title: '银行卡已存在',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }).catch(() => {
            // loading.close()
          })
          return false
        }
      })
    }
  },
  created () {
    if (this.$route.query.type === 'edit') {
      if (this.$store.getters.bankInfo.id) {
        /* eslint-disable */
        const {bankInfo} = this.$store.getters
        this.bankForm.bankAddress = bankInfo.bankaddress,
        this.bankForm.bankCardNumbers = bankInfo.bankaccount
        const current = bankList.find(item => item.title === bankInfo.bankname)
        this.bankForm.id = current ? current.id : 1
      } else {
        this.$store.dispatch('fetchBankInfo').then(() => {
          /* eslint-disable */
          const {bankInfo} = this.$store.getters
          this.bankForm.bankAddress = bankInfo.bankaddress,
          this.bankForm.bankCardNumbers = bankInfo.bankaccount
          const current = bankList.find(item => item.title === bankInfo.bankname)
          this.bankForm.id = current ? current.id : 1
        })
      }
    }
  }
}
</script>


