<template>
<div class="home-wrapper__content animated fadeIn">
  <div class="home-wrapper__title">
    <h4>存取记录</h4>
  </div>
  <div class="balance-record">
    <div class="balance-record__table">
      <el-table :data="balanceData" stripe style="width: 100%">
        <el-table-column prop="billcode" label="订单号" width="200"> </el-table-column>
        <el-table-column prop="id" label="会员"> </el-table-column>
        <el-table-column prop="createdTime" label="订单生成日期"> </el-table-column>
        <el-table-column prop="type" label="存储类型" width="100"> </el-table-column>
        <el-table-column prop="remark" label="支付方式"> </el-table-column>
        <el-table-column prop="money" label="交易金额"> </el-table-column>
        <el-table-column prop="orderStatus" label="处理状态" width="100"> </el-table-column>
      </el-table>
    </div>
    <div class="balance-record__pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="15"
        layout="total, prev, pager, next, jumper"
        :total="numberOfResults">
      </el-pagination>
    </div>
  </div>
</div> 
</template>

<script>
import api from '@/api'
import { timestampToDate } from '@/api/convert-date-and-timestamp'

export default {
  data () {
    return {
      currentPage: 1,
      numberOfResults: 1,
      balanceData: []
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.currentPage = page
      this.getBalanceRecord(this.currentPage)
    },
    getBalanceRecord (page = 1) {
      api.getBalanceRecord({pageNo: page, pageSize: 15})
        .then(result => {
          this.numberOfResults = result.data.total
          this.balanceData = this.formatBalanceData(result.data.response)
        })
    },
    formatBalanceData (data) {
      if (data && data.length > 0) {
        data.forEach(da => {
          da.type = da.type === 0 ? '存入' : '提出'
          da.createdTime = timestampToDate(da.createdTime)
          switch (da.orderStatus) {
            case 0: da.orderStatus = '待定'; break
            case 1: da.orderStatus = '成功'; break
            case 2: da.orderStatus = '取消'; break
          }
        })
        return data
      }
      return []
    }
  },
  mounted () {
    this.getBalanceRecord()
  }
}
</script>
